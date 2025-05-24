// src/order/dto/create-order.dto.ts
export class CreateOrderItemDto {
     productId: number;
     quantity: number;
     price: number;
}

export class CreateOrderDto {
     customerName: string;
     customerPhone: string;
     paymentMethod: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
     items: CreateOrderItemDto[];
}
