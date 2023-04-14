import { Type } from "class-transformer";
import { IsInt, Min, IsOptional, IsNumberString, IsEnum } from "class-validator";

enum SortField {
    CreatedAt = 'created_at',
}

enum Order {
    Asc = 'asc',
    Desc = 'desc'
}

export class FindAllQuery {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1

    @IsInt()
    @Min(1)
    @Type(() => Number)
    take: number = 100

    @IsOptional()
    @IsNumberString()
    filter: string

    @IsEnum(SortField)
    sort: SortField = SortField.CreatedAt

    @IsEnum(Order)
    order: Order = Order.Asc
}