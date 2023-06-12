import { IsDefined, IsInt } from "class-validator";

export class SeedItemDTO {
  @IsDefined()
  @IsInt()
  count!: number;
}
