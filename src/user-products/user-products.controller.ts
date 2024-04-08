import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,UseGuards } from '@nestjs/common';
import { UserProductsService } from './user-products.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('userProducts')
export class UserProductsController {
  constructor(private readonly userProductsService: UserProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUserProductDto: CreateUserProductDto) {
    return this.userProductsService.create(createUserProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userProductsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userProductsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserProductDto: UpdateUserProductDto) {
    return this.userProductsService.update(id, updateUserProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userProductsService.remove(id);
  }
}