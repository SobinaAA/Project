import { ORDER_STATUS } from 'data/orders/statuses';
import { IResponseFields } from 'data/types/api.types';
import { ICustomerFromResponse } from './customers.types';
import { IProductFromResponse } from './product.types';
import { COUNTRIES } from 'data/customers/countries';
import { DELIVERY } from 'data/orders/delivery';
import { ACTIONS } from 'data/orders/actions';

export interface IOrder {
  status: ORDER_STATUS;
  customer: ICustomerFromResponse;
  products: IProductFromOrder[];
  delivery: IDelivery | null;
  total_price: number;
  comments: IComments[];
  history: IHistory[];
}

export interface IOrderFromResponse extends IOrder {
  _id: string;
  createdOn: string;
}

export interface IOrderResponse extends IResponseFields {
  Order: IOrderFromResponse;
}

export interface IOrdersResponse extends IResponseFields {
  Orders: IOrderFromResponse[];
}

export interface IProductFromOrder extends Partial<IProductFromResponse> {
  received: boolean;
}

interface IAddress {
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
}

interface IDelivery {
  address: IAddress;
  finalDate: string;
  condition: DELIVERY;
}

interface IHistory {
  status: ORDER_STATUS;
  customer: string;
  products: IProductFromOrder[];
  delivery: IDelivery | null;
  total_price: number;
  changedOn: string;
  action: ACTIONS;
}

interface IComments {
  text: string;
  createdOn: string;
  _id: string;
}

export interface IOrderData {
  customer: string;
  products: string[];
}
