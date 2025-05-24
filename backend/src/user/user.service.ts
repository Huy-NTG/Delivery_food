// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like } from 'typeorm';

import * as bcrypt from 'bcrypt'; // đảm bảo đã import
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // async update(id: number, updateDto: UpdateUserDto): Promise<User> {
  //   await this.userRepository.update(id, updateDto);
  //   return this.findOne(id);
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
  
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // async create(createDto: CreateUserDto): Promise<User> {
  //   const user = this.userRepository.create(createDto);
  //   return this.userRepository.save(user);
  // }
  async create(createDto: CreateUserDto): Promise<User> {
    const defaultPassword = '123456';
  
    // Hash mật khẩu (nếu không có thì dùng mật khẩu mặc định)
    const rawPassword = createDto.password || defaultPassword;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
  
    const user = this.userRepository.create({
      ...createDto,
      password: hashedPassword,
    });
  
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  // kiếm theo tên
  async searchByName(keyword: string): Promise<User[]> {
    return this.userRepository.find({
      where: {
        username: Like(`%${keyword}%`),
      },
      order: { username: 'ASC' },
    });
  }
  
}
