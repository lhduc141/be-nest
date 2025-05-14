import {Module} from "@nestjs/common";
import {RouterModule} from "@nestjs/core";

const modules: any[] = [
];

@Module({
    imports: [
        ...modules,
        RouterModule.register([
            {
                path: '/api',
                children: modules.map((module) => ({
                    path: '/',
                    module: module,
                })),
            },
        ]),
    ],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: PermissionGuard,
        // },
    ],
})
export class MainModule {}