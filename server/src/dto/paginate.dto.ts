import { IsDefined, IsInt } from "class-validator";

export class PaginateItemDTO{
    @IsDefined()
    @IsInt()
    take!: number;

    @IsDefined()
    @IsInt()
    page!: number;
}