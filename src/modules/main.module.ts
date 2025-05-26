import {Module} from "@nestjs/common";
import {RouterModule} from "@nestjs/core";
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';

const modules: any[] = [];

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
        AuthModule,
        EmployeeModule,
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