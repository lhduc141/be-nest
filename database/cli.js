/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const colors = {
    white: '\x1b[37m',
    yellow: '\x1b[33m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

/** @type {import('sequelize').Options} */
const sequelizeOptions = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    benchmark: true,
    logging:
        process.env.DATABASE_LOGGING === 'true'
            ? (sql, timing) => console.log(`${sql.replaceAll(/\s+/g, ' ')} ${colors.yellow}+${timing}ms${colors.white}`)
            : false,
    dialectOptions: {
        prependSearchPath: true,
    },
};

class DatabaseCli {
    _sequelize;
    _metaModel;
    _migrationsPath = __dirname + '/migrations';
    _seedersPath = __dirname + '/seeders';

    constructor() {
        const sequelize = new Sequelize(sequelizeOptions);
        this._metaModel = sequelize.define(
            'Meta',
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            { timestamps: false },
        );
        this._sequelize = sequelize;
    }

    async init() {
        await this._sequelize.createSchema(process.env.DATABASE_DATABASE);
        await this._sequelize.authenticate();
        await this._sequelize.sync();
    }

    async run() {
        if (!process.argv[2] || process.argv[2] === '--migrate') {
            await this.migrate(this._migrationsPath);
        }
        if (!process.argv[2] || process.argv[2] === '--seed') {
            await this.migrate(this._seedersPath);
        }
    }

    async migrate(dirPath) {
        const files = [];

        if (!fs.existsSync(dirPath)) {
            console.log('Dir not found:', dirPath);
        } else {
            files.push(
                ...fs
                    .readdirSync(dirPath, {})
                    .filter((file) => file.slice(-4) === '.sql')
                    .map((fileName) => ({
                        fileName: fileName,
                        filePath: path.join(dirPath, fileName),
                    })),
            );
        }

        for (const { fileName, filePath } of files) {
            await this.execute(fileName, filePath);
        }
    }

    async execute(fileName, filePath) {
        console.log(`${colors.magenta}${fileName}${colors.white}`);
        try {
            const databaseMeta = await this._metaModel.findByPk(fileName);
            if (!databaseMeta) {
                const rawQuery = fs.readFileSync(filePath).toString();

                await this._sequelize.transaction(async (t) => {
                    await this._sequelize.query(rawQuery, { transaction: t });
                    await this._metaModel.create({ name: fileName, createdAt: new Date() }, { transaction: t });
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

async function bootstrap() {
    try {
        const databaseCli = new DatabaseCli();
        await databaseCli.init();
        await databaseCli.run();

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit();
    }
}
bootstrap();
