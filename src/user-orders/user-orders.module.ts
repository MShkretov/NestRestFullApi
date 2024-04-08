import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserOrdersService } from './user-orders.service';
import { UserOrdersController } from './user-orders.controller';
import { UserOrderSchema } from './schemas/user-order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserOrder', schema: UserOrderSchema }])
  ],
  providers: [UserOrdersService],
  controllers: [UserOrdersController],
})
export class UserOrdersModule {}