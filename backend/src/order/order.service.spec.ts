// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentMethod } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerName, customerPhone, paymentMethod, items } = createOrderDto;

    let customer = await this.customerRepo.findOneBy({ phone: customerPhone });
    if (!customer) {
      customer = this.customerRepo.create({ name: customerName, phone: customerPhone });
      await this.customerRepo.save(customer);
    }

    const orderItems = items.map(item => {
      return this.itemRepo.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    });

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = this.orderRepo.create({
      customer,
      paymentMethod: paymentMethod as PaymentMethod,
      status: OrderStatus.PENDING,
      total,
      items: orderItems,
    });

    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({ relations: ['items', 'customer'] });
  }
}
