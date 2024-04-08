import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { UpdateUserOrderDto } from './dto/update-user-order.dto';
import { UserOrder } from './schemas/user-order.schema';

@Injectable()
export class UserOrdersService {
  constructor(@InjectModel('UserOrder') private userOrderModel: Model<UserOrder>) {}

  async create(createUserOrderDto: CreateUserOrderDto): Promise<UserOrder> {
    const createdUserOrder = new this.userOrderModel(createUserOrderDto);
    return createdUserOrder.save();
  }
  async findAll(): Promise<UserOrder[]> {
    return this.userOrderModel.find().exec();
  }

  async findOne(id: string): Promise<UserOrder> {
    const userOrder = await this.userOrderModel.findById(id).exec();
    if (!userOrder) {
      throw new NotFoundException(`UserOrder with ID ${id} not found`);
    }
    return userOrder;
  }

  async update(id: string, updateUserOrderDto: UpdateUserOrderDto): Promise<UserOrder> {
    const updatedUserOrder = await this.userOrderModel.findByIdAndUpdate(id, updateUserOrderDto, { new: true }).exec();
    if (!updatedUserOrder) {
      throw new NotFoundException(`UserOrder with ID ${id} not found`);
    }
    return updatedUserOrder;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userOrderModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`UserOrder with ID ${id} not found`);
    }
  }
}