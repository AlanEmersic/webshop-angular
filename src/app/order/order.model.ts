export interface Order {
  id?: number;
  discountCodeId?: number;
  paymentMethodId?: number;
  date: string;
  totalPriceWithDiscount?: number;
  totalPriceWithoutDiscount: number;
  cardNumber?: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  remark?: string;
}
