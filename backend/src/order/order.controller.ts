import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('total')
  getTotalRevenue() {
    return this.orderService.getTotalRevenue();
  }
  @Get('total-orders')
  getTotalOrders() {
    return this.orderService.getTotalOrders();
  }
  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.orderService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
  // @Get('today-orders')
  // getTodayOrders() {
  //   return this.orderService.getTodayOrders();
  // }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.orderService.updateStatus(id, status);
  }

  

}
