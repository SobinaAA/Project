export type sortMethodProducts =
  | 'Name'
  | 'Price'
  | 'Manufacturer'
  | 'Created On';
export type direction = 'asc' | 'desc';
export interface ISort {
  field: sortMethodProducts | sortMethodCustomers | sortMethodOrders;
  direction: direction;
}

export type sortMethodCustomers =
  | 'Name'
  | 'Email'
  | 'Price'
  | 'Country'
  | 'Created On';

export type sortMethodOrders =
  | 'Order Number'
  | 'Name'
  | 'Email'
  | 'Price'
  | 'Delivery'
  | 'Status'
  | 'Created On';
