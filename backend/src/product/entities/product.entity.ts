import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column({ type: 'text', nullable: true })
     description: string;

     @Column('decimal', { precision: 10, scale: 2 })
     price: number;

     @Column({ nullable: true })
     image: string;

     @Column()
     category: string

     @Column()
     quantity: number;
}
