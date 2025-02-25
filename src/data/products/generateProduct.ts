import { getRandromEnumValue } from 'utils/enum/getRandomValue';
import {
  IProduct,
  IProductFromResponse,
  MANUFACTURERS
} from 'data/types/product.types';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { formatDateToDateAndTime } from 'utils/date/dates';

/**
 * Generates a new product object with random data for each field.
 * Allows overriding of specific fields by providing a partial IProduct object.
 * @param {Partial<IProduct>} [params] - additional props to be merged with the generated product
 * @returns {IProduct} generated product object with random or overridden data.
 */
export const generateProductData = (params?: Partial<IProduct>): IProduct => {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandromEnumValue(MANUFACTURERS),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params
  } as IProduct;
};

export function generateProductFromResponse(
  params?: Partial<IProductFromResponse>
): IProductFromResponse {
  return {
    ...generateProductData(_.omit(params, ['id', 'createdOn'])),
    createdOn: formatDateToDateAndTime(new Date()),
    _id: faker.string.uuid()
  };
}
