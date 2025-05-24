// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ cung cấp User repository
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // ✅ nếu AuthModule cần dùng
})
export class UserModule { }
