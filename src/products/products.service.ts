import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<{ message: string, product: Product }> {
    const product = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(product);
    return { message: 'Product is successfully created', product };
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async productExists(productId: number): Promise<boolean> {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    return !!product;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<{ message: string, product: Product }> {
    const existingProduct = await this.productsRepository.findOne({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    await this.productsRepository.update(id, updateProductDto);
    const updatedProduct = await this.productsRepository.findOne({ where: { id } });
    return { message: 'Product is successfully updated', product: updatedProduct };
  }

  async remove(id: number): Promise<{ message: string }> {
    const existingProduct = await this.productsRepository.findOne({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    await this.productsRepository.delete(id);
    return { message: `Product with ID "${id}" successfully deleted` };
  }
}