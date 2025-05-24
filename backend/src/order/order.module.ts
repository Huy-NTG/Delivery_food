import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Customer, Product])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
