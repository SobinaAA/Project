import { ICustomerFromResponse } from 'data/types/customers.types';
import { sortsFieldCustomer, sortsASCDESC } from 'data/types/requestParams';

/**
 * Sorts array of customers by chosen field in chosen direction
 * @param {ICustomerFromResponse[]} arr - array of customers to sort
 * @param {sortsFieldCustomer} field - field to sort by
 * @param {sortsASCDESC} dir - direction of sorting
 * @returns {ICustomerFromResponse[]} sorted array of customers
 */
export function sorting(
  arr: ICustomerFromResponse[],
  field: sortsFieldCustomer,
  dir: sortsASCDESC
): ICustomerFromResponse[] {
  let mySortedTable: ICustomerFromResponse[];
  switch (field) {
    case 'name':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((prod1, prod2) =>
              prod1['name'].localeCompare(prod2['name'])
            )
          : arr.sort((prod1, prod2) =>
              prod2['name'].localeCompare(prod1['name'])
            );
      break;
    case 'country':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((cust1, cust2) =>
              cust1['country'].localeCompare(cust2['country'])
            )
          : arr.sort((cust1, cust2) =>
              cust2['country'].localeCompare(cust1['country'])
            );
      break;
    case 'email':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((cust1, cust2) =>
              cust1['email'].localeCompare(cust2['email'])
            )
          : arr.sort((cust1, cust2) =>
              cust2['email'].localeCompare(cust1['email'])
            );
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
