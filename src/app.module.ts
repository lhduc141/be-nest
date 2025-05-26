import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import {LoggerMiddleware} from "./middleware/logging.middleware";
import {MainModule} from "./modules/main.module";

@Module({
  imports: [MainModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
