import { IsNotEmpty } from 'class-validator';

export class CreateUserProductDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;
}