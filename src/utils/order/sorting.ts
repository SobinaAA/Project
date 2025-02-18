import { IOrderFromResponse } from 'data/types/orders.types';
import { sortsASCDESC, sortsFieldOrder } from 'data/types/requestParams';

/**
 * Sorts array of orders by chosen field in chosen direction
 * @param {IOrderFromResponse[]} arr - array of products to sort
 * @param {sortsFieldOrder} field - field to sort by
 * @param {sortsASCDESC} dir - direction of sorting
 * @returns {IOrderFromResponse[]} sorted array of products
 */
export function sorting(
  arr: IOrderFromResponse[],
  field: sortsFieldOrder,
  dir: sortsASCDESC
): IOrderFromResponse[] {
  let mySortedTable: IOrderFromResponse[];
  switch (field) {
    case 'status':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((prod1, prod2) =>
              prod1['manufacturer'].localeCompare(prod2['manufacturer'])
            )
          : arr.sort((prod1, prod2) =>
              prod2['manufacturer'].localeCompare(prod1['manufacturer'])
            );
      break;
    case 'total_price':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((prod1, prod2) => +prod1['price'] - +prod2['price'])
          : arr.sort((prod1, prod2) => +prod2['price'] - +prod1['price']);
      break;
    case 'createdOn':
      mySortedTable =
        dir === 'asc'
          ? arr.sort(
              (prod1, prod2) =>
                Date.parse(prod1['createdOn']) - Date.parse(prod2['createdOn'])
            )
          : arr.sort(
              (prod1, prod2) =>
                Date.parse(prod2['createdOn']) - Date.parse(prod1['createdOn'])
            );
      break;
    default:
      throw new Error('Другие методы пока не реализованы!');
  }
  return mySortedTable;
}
