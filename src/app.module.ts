import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { UserProductsModule } from './user-products/user-products.module';
import { UserOrdersModule } from './user-orders/user-orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'csmanqka2',
      database: 'nestapi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/restfullapi', {
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    UserProductsModule,
    UserOrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}