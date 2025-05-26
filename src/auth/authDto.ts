import {IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, Length, Min} from "class-validator";

export enum Country {
    VN = 'VietNam',
    UK = 'United Kingdom',
    IU = 'International University',
    USA = 'United State America',
}

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Min(10)
    age: number;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(5, 255)
    // @Min(5, { message: 'Password must be at least 6 characters' })
    password: string;

    @IsEnum(Country,{} )
    @IsNotEmpty()
    country: Country;
}

