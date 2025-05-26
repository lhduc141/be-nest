import {Injectable, Logger} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {TokenDto} from "./dto/token.dto";
import {ResponseDto} from "../../dto/response.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    async login(loginDto: LoginDto): Promise<ResponseDto<TokenDto>> {
        if (loginDto.username === 'admin' && loginDto.password === '123456') {
            const token: TokenDto = {
                accessToken: 'mockAccessToken123',
                refreshToken: 'mockRefreshToken456',
            };

            return new ResponseDto<TokenDto>({
                statusCode: 200,
                message: 'Đăng nhập thành công',
                data: token
            });
        }

        return new ResponseDto<TokenDto>({
            statusCode: 401,
            message: 'Tên đăng nhập hoặc mật khẩu không đúng',
            data: null,
            errors: ['Unauthorized']
        });
    }



}
