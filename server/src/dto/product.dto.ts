import { IsDefined, IsInt, IsString } from "class-validator";

export class InsertItemDTO {
  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsInt()
  price!: number;
}

export class UpdateItemDTO {
  @IsDefined()
  @IsInt()
  id!: number;

  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsInt()
  price!: number;
}

export class DeleteItemDTO {
  @IsDefined()
  @IsInt()
  id!: number;
}
