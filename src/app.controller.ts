import {Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import { AppService } from './app.service';
import {ApiTag} from "./decorators/api-tag.decorator";

@Controller()
@ApiTag({ name: 'app' })
export class AppController {
  constructor(private readonly appService: AppService) {}
}
