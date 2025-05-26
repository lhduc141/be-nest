import { ClassConstructor } from 'class-transformer';
export declare class PagingDto {
    readonly pageIndex?: number;
    readonly pageSize?: number;
}
export declare class PagingV2Dto {
    readonly skip?: number;
    readonly limit?: number;
}
export declare class PagingDataDto<T> {
    constructor(partial?: PagingDataDto<T>);
    count: number;
    rows: T[];
}
export declare function PagingDataDtoType<T>(cls?: ClassConstructor<T>): typeof PagingDataDto<T>;
