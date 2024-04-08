import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProduct } from './entities/user-product.entity';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class UserProductsService {
  constructor(
    @InjectRepository(UserProduct)
    private userProductsRepository: Repository<UserProduct>,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  async create(createUserProductDto: CreateUserProductDto): Promise<UserProduct> {
    const user = await this.usersService.findOne(createUserProductDto.userId);
    const product = await this.productsService.findOne(createUserProductDto.productId);

    const userProduct = new UserProduct();
    userProduct.user = user;
    userProduct.product = product;
    await this.userProductsRepository.save(userProduct);

    return userProduct;
  }

  async findAll(): Promise<UserProduct[]> {
    return this.userProductsRepository.find({ relations: ['user', 'product'] });
  }

  async findOne(id: number): Promise<UserProduct> {
    const userProduct = await this.userProductsRepository.findOne({
      where: { id },
      relations: ['user', 'product']
    });
    if (!userProduct) {
      throw new NotFoundException(`UserProduct with ID ${id} not found.`);
    }
    return userProduct;
  }

  async update(id: number, updateUserProductDto: UpdateUserProductDto): Promise<{ message: string, userProduct: UserProduct }> {
    let existingUserProduct = await this.findOne(id);
    
    if (updateUserProductDto.userId) {
      existingUserProduct.user = await this.usersService.findOne(updateUserProductDto.userId);
    }
    if (updateUserProductDto.productId) {
      existingUserProduct.product = await this.productsService.findOne(updateUserProductDto.productId);
    }

    await this.userProductsRepository.save(existingUserProduct);
    return { message: 'UserProduct is successfully updated', userProduct: existingUserProduct };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.userProductsRepository.delete(id);
    return { message: `UserProduct with ID ${id} successfully deleted.` };
  }
}