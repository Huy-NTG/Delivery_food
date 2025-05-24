import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository, Not, Between } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus, PaymentMethod } from './entities/order.entity';

@Injectable()
export class OrderService {
  orderRepository: any;
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,

    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,

    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerName, customerPhone, paymentMethod, items } = createOrderDto;

    // Tìm hoặc tạo mới customer
    let customer = await this.customerRepo.findOneBy({ phone: customerPhone });
    if (!customer) {
      customer = this.customerRepo.create({ name: customerName, phone: customerPhone });
      await this.customerRepo.save(customer);
    }
    // Cập nhật số lượng
    for (const item of items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${item.productId}`);
      }

      // Trừ số lượng
      product.quantity -= item.quantity;

      // Lưu lại
      const updatedProduct = await this.productRepository.save(product);
      console.log('Đã cập nhật sản phẩm:', updatedProduct);
    }
    // Tạo danh sách order item
    const orderItems = items.map(item =>
      this.itemRepo.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }),
    );

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Tạo đơn hàng
    const order = this.orderRepo.create({
      customer,
      paymentMethod: paymentMethod as PaymentMethod,
      status: OrderStatus.PENDING,
      total,
      items: orderItems,
    });

    try {
      return await this.orderRepo.save(order);
    } catch (error) {
      console.error(' Error saving order:', error);
      throw error;
    }
  }

  // async findAll() {
  //   return this.orderRepo.find({
  //     relations: ['items', 'customer'],
  //     order: {
  //       id: 'DESC',
  //     },
  //   });
  // }
  async findAll(page = 1, limit = 5) {
    return this.orderRepo.find({
      relations: ['items', 'customer'],
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'customer'],
    });
  }
  private async getOrderOrFail(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOrderOrFail(id);
    const updated = this.orderRepo.merge(order, dto as import('typeorm').DeepPartial<Order>);
    return this.orderRepo.save(updated);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (order) {
      await this.orderRepo.remove(order);
    }
    return { deleted: true };
  }

  async updateStatus(id: number, status: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status;
    return this.orderRepo.save(order);
  }
  // tổng doanh thu
  async getTotalRevenue(): Promise<number> {
    const orders = await this.orderRepo.findBy({
      status: Not(OrderStatus.PENDING),
    });

    return orders.reduce((sum, o) => sum + Number(o.total), 0);
  }
  // tổng số đơn
  async getTotalOrders(): Promise<number> {
    return await this.orderRepo.count(); // đếm tất cả đơn hàng trong bảng orders
  }
 
};
