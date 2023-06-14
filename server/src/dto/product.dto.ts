import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator";

export class InsertItemDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
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
