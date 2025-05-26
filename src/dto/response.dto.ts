import { ApiProperty } from '@nestjs/swagger';
import {ClassConstructor} from "class-transformer";

export class ResponseDto<T = null> {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Thành công' })
    message: string;

    @ApiProperty({ required: false })
    data: T | null;

    @ApiProperty({ required: false, type: [String] })
    errors?: string[];

    constructor(partial: Partial<ResponseDto<T>> = {}) {
        Object.assign(this, partial);
    }
}

export function ResponseDtoType<T>(cls: ClassConstructor<T>) {
    class ResponseDtoWithData extends ResponseDto<T> {
        @ApiProperty({ type: cls })
        data: T = undefined as unknown as T;
    }
    return ResponseDtoWithData;
}
