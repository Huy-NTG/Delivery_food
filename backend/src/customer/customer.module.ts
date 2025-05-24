import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Customer])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
