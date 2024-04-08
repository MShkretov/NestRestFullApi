import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserOrdersService } from './user-orders.service';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { UpdateUserOrderDto } from './dto/update-user-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('userOrders')
export class UserOrdersController {
  constructor(private readonly userOrdersService: UserOrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createUserOrderDto: CreateUserOrderDto) {
    const userOrder = await this.userOrdersService.create(createUserOrderDto);
    return {
      message: 'User order created successfully',
      userOrder,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    const userOrders = await this.userOrdersService.findAll();
    return userOrders;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userOrder = await this.userOrdersService.findOne(id);
    return userOrder;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserOrderDto: UpdateUserOrderDto) {
    const updatedUserOrder = await this.userOrdersService.update(id, updateUserOrderDto);
    return {
      message: 'User order updated successfully',
      updatedUserOrder,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userOrdersService.remove(id);
    return {
      message: 'User order removed successfully',
    };
  }
}