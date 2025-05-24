import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  create(data: Partial<Product>) {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  // findAll() {
  //   return this.productRepository.find();
  // }
  async findAll(page: number = 1, limit: number = 10) {
    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data: products,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateDto: any) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, updateDto);
    return this.productRepository.save(product);
  }
  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return this.productRepository.remove(product);
  }
}
