// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ unique: true })
     email: string;

     @Column({ unique: true })
     username: string;

     @Column()
     password: string;

     @Column({ nullable: true })
     sdt: string;

     @Column({ default: 'user' })
     role: string;

     @Column({ default: 'active' })
     status: string;

     @Column({ nullable: true })
     lastLogin: Date;
}
