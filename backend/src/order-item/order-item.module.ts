import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { Order } from 'src/order/entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Customer])],
  controllers: [OrderItemController],
  providers: [OrderItemService]
})
export class OrderItemModule {}
