import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<{ message: string, order: any }> {
    const productExists = await this.productsService.productExists(createOrderDto.productId);
    if (!productExists) {
      throw new NotFoundException(`Product with ID ${createOrderDto.productId} does not exist.`);
    }
    const createdOrder = new this.orderModel(createOrderDto);
    await createdOrder.save();
    return { message: 'Order is successfully created', order: createdOrder };
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: any): Promise<{ message: string, order: any }> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return { message: 'Order is successfully updated', order: updatedOrder };
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return { message: 'Order is successfully deleted' };
  }
}