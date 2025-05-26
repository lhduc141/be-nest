import { ApiPropertyOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
export declare class ResponseDto<T = null> {
    constructor(partial?: Partial<ResponseDto<T>>);
    statusCode: number;
    message: string;
    data: T | null;
    errors?: string[];
}
export declare function ResponseDtoType<T>(cls: ClassConstructor<T> | null, options?: ApiPropertyOptions): typeof ResponseDto<T>;
declare const ResponseSuccessDto_base: {
    new (partial?: Partial<ResponseDto<unknown>>): ResponseDto<unknown>;
};
export declare class ResponseSuccessDto extends ResponseSuccessDto_base {
}
export {};
