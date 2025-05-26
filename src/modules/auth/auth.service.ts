import {Injectable, Logger} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {ResponseDto} from "../../dto/response.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);


    // async login(loginDto: LoginDto, userIP?: string): Promise<ResponseDto<TokenDto>> {
    //     const loginResp = await this.authClientService.login(loginDto);
    //     if (loginResp.data.accessToken) {
    //         this._handleLogin(loginResp.data.accessToken, userIP).catch((err) => {
    //             this.logger.error('Handle login error', err?.stack ?? err);
    //         });
    //     }
    //
    //     return loginResp;
    // }

}
