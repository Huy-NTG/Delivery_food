// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const existing = await this.userService.findByEmail(createUserDto.email);
    if (existing) throw new BadRequestException('Email đã được sử dụng');

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Gửi dữ liệu vào userService
    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'user', // gán mặc định nếu cần
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
