// src/customer/entities/customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Customer {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column({ unique: true })
     phone: string;

     @OneToMany(() => Order, order => order.customer)
     orders: Order[];
}
