import { IsDefined, IsInt } from "class-validator";

export class InfiniteItemDTO{
    @IsDefined()
    @IsInt()
    take!: number;

    @IsDefined()
    @IsInt()
    offset!: number;
}