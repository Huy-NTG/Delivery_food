// src/order-item/entities/order-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class OrderItem {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     productId: number;

     @Column()
     quantity: number;

     @Column('decimal')
     price: number;

     @ManyToOne(() => Order, order => order.items)
     order: Order;
}
