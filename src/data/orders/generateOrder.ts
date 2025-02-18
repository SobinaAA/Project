// import { faker } from '@faker-js/faker';
// import { getRandromEnumValue } from '../../utils/enum/getRandomValue';
// import { IOrder } from 'data/types/orders.types';
// import { ICustomer } from '../types/customers.types';
// import { IProduct } from 'data/types/product.types';
// import { COUNTRIES } from 'data/customers/countries';
// import { generateNewCustomer } from 'data/customers/generateCustomer';
// import { generateProductData } from 'data/products/generateProduct';
// import { generateDelivery } from 'utils/order/generateDelivery';
// import { ORDER_STATUS } from './statuses';

// /**
//  * Generates a new order object with random data for each field.
//  * Allows overriding of specific fields by providing a partial IOrder object.
//  *
//  * @param {Partial<IOrder>} [params] - Additional props to be merged with the generated order
//  * @returns {IOrder} - A new order object with random or overridden data.
//  */

// export const generateOrder = (params?: Partial<IOrder>): IOrder => {
//     const fakeCustomer = generateNewCustomer;
//     const fakeProduct = generateProductData;
//     const fakeDelivery = generateDelivery();

//   return {
// status: getRandromEnumValue(ORDER_STATUS),
// customer: {fakeCustomer},
// products: [{fakeProduct}],
// total_price: faker.number.int(9999),
// createdOn: Date.now(),
// delivery: {fakeDelivery},
// comments: [{
// text: `${faker.string.alpha(50)}`,
// createdOn: Date.now()}],
// history: [{
//     status: getRandromEnumValue(ORDER_STATUS),
//     customer: `${faker.string.alpha(35)}`,
// products: [{fakeProduct}],
// total_price: faker.number.int(9999),
// action: "Order created",
// changedOn: Date.now
// }]
//   }}
