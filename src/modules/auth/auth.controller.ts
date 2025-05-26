import {Body, Controller, Post, Req, SerializeOptions} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {TokenDto} from "./dto/token.dto";
import { Request } from 'express';
import {ResponseDto, ResponseDtoType} from "../../dto/response.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SerializeOptions({ type: ResponseDtoType(TokenDto) })
  login(@Body() loginDto: LoginDto, @Req() request: Request): Promise<ResponseDto<TokenDto>> {
    return this.authService.login(loginDto);
  }
}
