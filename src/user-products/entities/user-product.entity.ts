import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class UserProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.products)
  user: User;

  @ManyToOne(() => Product, product => product.users)
  product: Product;
}