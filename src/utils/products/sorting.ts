import { IProductFromResponse } from '../../data/types/product.types';
import {
  sortsFieldProduct,
  sortsASCDESC
} from '../../data/types/requestParams';

export function sorting(
  arr: IProductFromResponse[],
  field: sortsFieldProduct,
  dir: sortsASCDESC
) {
  let mySortedTable: IProductFromResponse[];
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
    case 'manufacturer':
      mySortedTable =
        dir === 'asc'
          ? arr.sort((prod1, prod2) =>
              prod1['manufacturer'].localeCompare(prod2['manufacturer'])
            )
          : arr.sort((prod1, prod2) =>
              prod2['manufacturer'].localeCompare(prod1['manufacturer'])
            );
      break;
    case 'price':
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
