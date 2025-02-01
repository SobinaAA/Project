import { getRandromEnumValue } from '../../utils/enum/getRandomValue';
import { IProduct, MANUFACTURERS } from '../types/product.types';
import { faker } from '@faker-js/faker';
import { IProductNegative } from '../types/product.types';

export function generateProductData(customData?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandromEnumValue(MANUFACTURERS),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...customData
  };
}
export function generateNegativeProductData(
  customData?: IProductNegative
): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandromEnumValue(MANUFACTURERS),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...customData
  } as IProduct;
}
