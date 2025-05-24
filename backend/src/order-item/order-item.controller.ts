import { Controller, Get, Post, Body, Patch, Param, Delete, Query  } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ParseIntPipe } from '@nestjs/common';
import { OrderItem } from './entities/order-item.entity';
@Controller('order-item')
export class OrderItemController {
  itemService: any;
  constructor(private readonly orderItemService: OrderItemService) { }

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }
  @Get('order/:orderId')
  getByOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<OrderItem[]> {
    return this.itemService.findByOrder(orderId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
  @Get('best-selling')
  getBestSellingProducts(@Query('limit') limit: number = 10) {
    return this.orderItemService.getBestSellingProducts(limit);
  }
}
