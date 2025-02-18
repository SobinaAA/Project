import { IOrderFromResponse } from 'data/types/orders.types';
import { sortsFieldOrder, sortsASCDESC } from 'data/types/requestParams';

/**
 * Sorts array of orders by chosen field in chosen direction
 * @param {IOrderFromResponse[]} arr - array of customers to sort
 * @param {sortsFieldOrder} field - field to sort by
 * @param {sortsASCDESC} dir - direction of sorting
 * @returns {IOrderFromResponse[]} sorted array of customers
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
          ? arr.sort((ord1, ord2) =>
              ord1['status'].localeCompare(ord2['status'])
            )
          : arr.sort((ord1, ord2) =>
              ord2['status'].localeCompare(ord1['status'])
            );
      break;
    case 'total_price':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((ord1, ord2) => ord1['total_price'] - ord2['total_price'])
          : arr.sort((ord1, ord2) => ord2['total_price'] - ord1['total_price']);
      break;
    case 'createdOn':
      mySortedTable =
        dir === 'asc'
          ? arr.sort(
              (ord1, ord2) =>
                Date.parse(ord1['createdOn']) - Date.parse(ord2['createdOn'])
            )
          : arr.sort(
              (ord1, ord2) =>
                Date.parse(ord2['createdOn']) - Date.parse(ord1['createdOn'])
            );
      break;
    default:
      throw new Error('Другие методы пока не реализованы!');
  }
  return mySortedTable;
}
