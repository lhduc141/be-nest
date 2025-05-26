import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthDto} from "./authDto";

@Controller('auth')
export class AuthController {
    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() userData: AuthDto) {
        return {
            Email: `${userData.email}`,
            Password: `${userData.password}`,
            Country: `${userData.country}`,
        }
    }
}
