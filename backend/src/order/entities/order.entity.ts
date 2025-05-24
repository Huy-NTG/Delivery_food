// src/order/entities/order.entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';

export enum OrderStatus {
     PENDING = 'pending',
     PAID = 'paid',
     SHIPPED = 'shipped',
     PROCESSING = 'processing',
}

export enum PaymentMethod {
     COD = 'cod',
     BANK_TRANSFER = 'bank_transfer',
     MOMO = 'momo',
     VNPAY = 'vnpay',
}

@Entity()
export class Order {
     @PrimaryGeneratedColumn()
     id: number;

     @CreateDateColumn()
     createdAt: Date;

     @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
     status: OrderStatus;

     @Column({
          type: 'enum',
          enum: PaymentMethod,
          default: PaymentMethod.COD,
     })
     paymentMethod: PaymentMethod;

     @Column('decimal')
     total: number; // lưu ý kiểu 

     @ManyToOne(() => Customer, customer => customer.orders, { eager: true })
     customer: Customer;

     @OneToMany(() => OrderItem, item => item.order, { cascade: true })
     items: OrderItem[];
}
