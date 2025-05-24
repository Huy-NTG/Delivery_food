import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { OrderItemModule } from './order-item/order-item.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: "",
      database: 'newdelivery',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true
    }),
    ProductModule,
    OrderModule,
    CustomerModule,
    OrderItemModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {}