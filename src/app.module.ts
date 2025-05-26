import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./middleware/logging.middleware";
import {MainModule} from "./modules/main.module";
import {AuthService} from "./modules/auth/auth.service";

@Module({
  imports: [MainModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
