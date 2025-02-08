export type sortMethodProducts =
  | 'Name'
  | 'Price'
  | 'Manufacturer'
  | 'Created On';
export type direction = 'asc' | 'desc';
export interface ISort {
  field: sortMethodProducts | sortMethodCustomers;
  direction: direction;
}

export type sortMethodCustomers =
  | 'Name'
  | 'Email'
  | 'Price'
  | 'Country'
  | 'Created On';
