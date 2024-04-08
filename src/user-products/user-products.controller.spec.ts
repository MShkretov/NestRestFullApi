import { Test, TestingModule } from '@nestjs/testing';
import { UserProductsController } from './user-products.controller';

describe('UserProductsController', () => {
  let controller: UserProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProductsController],
    }).compile();

    controller = module.get<UserProductsController>(UserProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
