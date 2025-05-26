import { ApiProperty } from '@nestjs/swagger';

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
