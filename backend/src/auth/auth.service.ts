// src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const existing = await this.userService.findByEmail(createUserDto.email);
    if (existing) throw new BadRequestException('Email đã được sử dụng');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'user',
    });

    return { message: 'Đăng ký thành công', user };
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email;
    const password = loginDto.password;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}
