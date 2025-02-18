import { faker } from '@faker-js/faker';
import { getRandromEnumValue } from '../../utils/enum/getRandomValue';
import { ICustomer } from '../types/customers.types';
import { COUNTRIES } from './countries';

/**
 * Generates a new customer object with random data for each field.
 * Allows overriding of specific fields by providing a partial ICustomer object.
 *
 * @param {Partial<ICustomer>} [params] - Additional props to be merged with the generated customer
 * @returns {ICustomer} - A new customer object with random or overridden data.
 */

export const generateNewCustomer = (params?: Partial<ICustomer>): ICustomer => {
  return {
    email: Date.now() + faker.internet.email(),
    name: `${faker.string.alpha(35)}`,
    country: getRandromEnumValue(COUNTRIES),
    city: `City ${faker.string.alpha(15)}`,
    street: `Street ${faker.string.alphanumeric(33)}`,
    house: faker.number.int(999),
    flat: faker.number.int(9999),
    phone: `+${faker.number.int(999999999999)}`,
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params
  } as ICustomer;
};
