import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { MainModule } from 'src/modules/main.module';
import {apiSwaggerConfig} from "../decorators/api-swagger.decorators";

export function useApiSwagger(app: INestApplication, path: string): void {
	try {
		const document = SwaggerModule.createDocument(app, apiSwaggerConfig, {
			include: [AppModule, MainModule],
			deepScanRoutes: true,
		});
		Object.values(document.paths).forEach((path) => {
			Object.values(path).forEach((method) => {
				if (Array.isArray(method.security) && method.security.includes('public')) {
					method.security = [];
				}
			});
		});

		SwaggerModule.setup(path, app, document);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
