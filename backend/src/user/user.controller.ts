import { Controller, Get, Post, Body, Patch, Param, Delete, Query  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // tạo mới người dùng
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // lấy tất cả người dùng
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  // lấy người dùng theo id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  // cập nhật người dùng theo id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  // xóa người dùng theo id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Get('search/by-name')
searchByName(@Query('q') keyword: string) {
  return this.userService.searchByName(keyword);
}
}
