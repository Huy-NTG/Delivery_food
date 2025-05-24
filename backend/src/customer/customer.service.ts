import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) { }

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepo.create(createCustomerDto);
    return this.customerRepo.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    return this.customerRepo.findOneBy({ phone });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepo.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const customer = await this.findOne(id);
    await this.customerRepo.remove(customer);
    return { deleted: true };
  }
}
