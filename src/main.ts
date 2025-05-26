import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common';
import {useApiSwagger} from "./swagger";
import * as process from "node:process";
import * as momentTimezone from 'moment-timezone';

import {Express, json} from "express";

momentTimezone.tz.setDefault(process.env.TZ);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Application', { timestamp: true });

  const expressApp: Express = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  useApiSwagger(app, 'docs');

  await app.listen(3000, "0.0.0.0", async () => {
    logger.log(`API documentation: ${await app.getUrl()}/docs`);
    logger.log(`API documentation for partners: ${await app.getUrl()}/partner_docs`);
  });
}
bootstrap();
