import { EntityRepository, Repository } from 'typeorm';
import { UserProduct } from './entities/user-product.entity';

@EntityRepository(UserProduct)
export class UserProductsRepository extends Repository<UserProduct> {
}