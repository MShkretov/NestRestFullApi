import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductsController } from './user-products.controller';
import { UserProductsService } from './user-products.service';
import { UserProduct } from './entities/user-product.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProduct]),
    UsersModule,
    ProductsModule,
  ],
  providers: [UserProductsService],
  controllers: [UserProductsController],
})

export class UserProductsModule {}