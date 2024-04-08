
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;
}