import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ maxLength: 255, description: 'Tên đăng nhập của người dùng' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly username: string;

    @ApiProperty({ maxLength: 255, description: 'Mật khẩu của người dùng' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    readonly password: string;

    @ApiPropertyOptional({ description: 'Đăng nhập bằng AD Account' })
    @IsOptional()
    @IsBoolean()
    readonly isADAccount?: boolean;
}
