import { COUNTRIES } from 'data/customers/countries';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IProductFromResponse, MANUFACTURERS } from 'data/types//product.types';
import { ORDER_STATUS } from 'data/orders/statuses';
import { IOrderFromResponse } from './orders.types';

export interface IProductRequestParams {
  search?: string;
  manufacturer?: MANUFACTURERS | string | MANUFACTURERS[];
  sortField?: sortsFieldProduct;
  sortOrder?: sortsASCDESC;
}

export interface ICustomerRequestParams {
  search?: string;
  country?: COUNTRIES | string | COUNTRIES[];
  sortField?: sortsFieldCustomer;
  sortOrder?: sortsASCDESC;
}

export interface IOrderRequestParams {
  search?: string;
  status?: ORDER_STATUS | string | ORDER_STATUS[];
  sortField?: sortsFieldOrder;
  sortOrder?: sortsASCDESC;
}

export const sortDir = {
  asc: 'По возрастанию',
  desc: 'По убыванию'
} as const;

export type sortsASCDESC = keyof typeof sortDir;
export type sortsFieldProduct = keyof typeof sortFieldProduct;

export const sortFieldProduct: Partial<IProductFromResponse> = {
  name: 'Наименование',
  price: 0,
  createdOn: 'Дата создания',
  manufacturer: MANUFACTURERS.AMAZON
} as const;

export const sortFieldCustomer: Partial<ICustomerFromResponse> = {
  name: 'Наименование',
  email: '',
  createdOn: 'Дата создания',
  country: COUNTRIES.RUSSIA
} as const;

export type sortsFieldOrder = keyof typeof sortFieldOrder;
export const sortFieldOrder: Partial<IOrderFromResponse> = {
  total_price: 0,
  createdOn: 'Дата создания',
  status: ORDER_STATUS.DRAFT
} as const;

export type sortsFieldCustomer = keyof typeof sortFieldCustomer;
