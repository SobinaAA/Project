import { expect, test } from 'fixtures/apiServices.fixture';
// import _ from 'lodash';
import { TAGS } from 'data/tags';
import { IOrderFromResponse } from 'data/types/orders.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IProductFromResponse } from 'data/types/product.types';

test.describe('[API] [Orders] [Sorting and filtering list of the Orders]', async function () {
  let order_1: IOrderFromResponse;
  let order_2: IOrderFromResponse;
  let product_1: IProductFromResponse;
  let product_2: IProductFromResponse;
  let customer_1: ICustomerFromResponse;
  let customer_2: ICustomerFromResponse;

  test.beforeAll(async ({ signInApiService, odrersAPIService }) => {
    await signInApiService.loginAsAdmin();
    ({ order_1, order_2, product_1, product_2, customer_1, customer_2 } =
      await odrersAPIService.createRandomOrder());
  });

  test(
    'Should GET the complete list of orders without sorting and filtering ',
    { tag: ['@1O-API', '@alena-orders', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ odrersAPIService }) {
      await odrersAPIService.getAll();
    }
  );

  test(
    `Should GET orders filtred by id`,
    { tag: ['@2O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const searchParam = order_1._id + '';
      const response = await odrersAPIService.getAll({
        search: searchParam
      });
      expect(
        response.body.Orders.some((order) => order._id === order_1._id),
        'Should find 1st order in the list'
      ).toBe(true);
    }
  );

  test(
    `Should GET orders filtred by total price`,
    { tag: ['@3O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const searchParam = order_1.total_price + '';
      const response = await odrersAPIService.getAll({
        search: searchParam
      });
      expect(
        response.body.Orders.some((order) => order._id === order_1._id),
        'Should find 1st order in the list'
      ).toBe(true);
    }
  );

  test(
    `Should GET orders filtred by status`,
    { tag: ['@4O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const searchParam = order_1.status + '';
      console.log(order_1.status, order_1._id);
      const response = await odrersAPIService.getAll({
        search: searchParam
      });
      expect(
        response.body.Orders.some((order) => order._id === order_1._id),
        'Should find 1st order in the list'
      ).toBe(true);
    }
  );

  test(
    `Should GET orders filtred by customer name`,
    { tag: ['@5O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const searchParam = order_1.customer.name + '';
      const response = await odrersAPIService.getAll({
        search: searchParam
      });
      expect(
        response.body.Orders.some((order) => order._id === order_1._id),
        'Should find 1st order in the list'
      ).toBe(true);
    }
  );

  test(
    `Should GET orders filtred by customer email`,
    { tag: ['@6O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const searchParam = order_1.customer.email + '';
      console.log('____________', searchParam);
      const response = await odrersAPIService.getAll({
        search: searchParam
      });
      expect(
        response.body.Orders.some((order) => order._id === order_1._id),
        'Should find 1st order in the list'
      ).toBe(true);
    }
  );

  // test(
  //   'Should GET customers filtred by Status',
  //   { tag: ['@5C-API', '@alena-customers', TAGS.REGRESSION, TAGS.SMOKE] },
  //   async function ({ customersApiService }) {
  //     const response = await customersApiService.getAll({
  //       country: customer_1.country
  //     });
  //     expect(
  //       response.body.Customers.some((prod) => prod._id === customer_1._id),
  //       'Should find 1st customer in the list'
  //     ).toBe(true);
  //   }
  // );

  // i = 6;
  // for (const keyField in sortFieldCustomer) {
  //   for (const keyDir in sortDir) {
  //     const tag = `@${i}C-API`;
  //     i++;
  //     test(
  //       `Should GET customers sorted by ${keyField} in ${keyDir} order`,
  //       { tag: [tag, '@alena-customers', TAGS.REGRESSION] },
  //       async function ({ customersApiService }) {
  //         const response = await customersApiService.getAll({
  //           sortField: keyField as sortsFieldCustomer,
  //           sortOrder: keyDir as sortsASCDESC
  //         });
  //         const sortedResponse = sorting(
  //           response.body.Customers,
  //           keyField as sortsFieldCustomer,
  //           keyDir as sortsASCDESC
  //         );
  //         expect(
  //           sortedResponse.every(
  //             (p, i) =>
  //               p[keyField as keyof typeof sortFieldCustomer] ===
  //               response.body.Customers[i][
  //                 keyField as keyof typeof sortFieldCustomer
  //               ]
  //           ),
  //           'Should match our and default sorting'
  //         ).toBe(true);
  //       }
  //     );
  //   }
  // }

  // test(
  //   'Should NOT GET the full list of customers with empty authorization token',
  //   { tag: ['@14C-API', '@alena-customers', TAGS.REGRESSION] },
  //   async function ({ customersAPIController }) {
  //     const response = await customersAPIController.getAll('');
  //     validateResponse(
  //       response,
  //       STATUS_CODES.NOT_AUTHORIZED,
  //       false,
  //       ERRORS.NOT_AUTHORIZED
  //     );
  //     validateJsonSchema(validationErrorSchema, response);
  //   }
  // );

  // test(
  //   'Should NOT GET the full list of customers with incorrect authorization token',
  //   { tag: ['@15C-API', '@alena-customers', TAGS.REGRESSION] },
  //   async function ({ customersAPIController }) {
  //     const incorrect_token = token.slice(13) + Date.now();
  //     const response = await customersAPIController.getAll(incorrect_token);
  //     validateResponse(
  //       response,
  //       STATUS_CODES.NOT_AUTHORIZED,
  //       false,
  //       ERRORS.NOT_AUTHORIZED
  //     );
  //     validateJsonSchema(validationErrorSchema, response);
  //   }
  // );

  // test(
  //   'Should GET full list of customers with invalid value for filtering by the Country field',
  //   { tag: ['@16P-API', '@alena-customers', TAGS.REGRESSION] },
  //   async function ({ customersApiService }) {
  //     const randomSearch = simpleFaker.string.alphanumeric(7);
  //     const response = await customersApiService.getAll({
  //       country: randomSearch
  //     });
  //     expect(
  //       response.body.Customers.length,
  //       'Should get 0 customers (empty list)'
  //     ).toBe(0);
  //   }
  // );

  // test(
  //   'Should GET an empty list of customers by setting strict search string conditions',
  //   { tag: ['@17C-API', '@alena-customers', TAGS.REGRESSION] },
  //   async function ({ customersApiService }) {
  //     const randomSearch = simpleFaker.string.alphanumeric(7);
  //     const response = await customersApiService.getAll({
  //       search: randomSearch
  //     });
  //     expect(
  //       response.body.Customers.length,
  //       'Should get 0 customers (empty list)'
  //     ).toBe(0);
  //   }
  // );

  // test(
  //   'Should GET not sorted products list (incorrect sort field)',
  //   { tag: ['@18C-API', '@alena-customers', TAGS.REGRESSION] },
  //   async function ({ customersApiService }) {
  //     await customersApiService.getAll({
  //       sortField: simpleFaker.string.alphanumeric(
  //         5
  //       ) as unknown as sortsFieldCustomer,
  //       sortOrder: 'asc'
  //     });
  //   }
  // );

  // test(
  //   'Should GET not sorted customers list (incorrect sort order)',
  //   { tag: ['@19C-API', '@alena-customers-customers', TAGS.REGRESSION] },
  //   async function ({ customersApiService }) {
  //     await customersApiService.getAll({
  //       sortField: 'name',
  //       sortOrder: simpleFaker.string.alphanumeric(4) as unknown as sortsASCDESC
  //     });
  //   }
  // );

  test.afterAll(
    async ({ odrersAPIService, productsAPIService, customersApiService }) => {
      if (order_1) await odrersAPIService.delete(order_1._id);
      if (order_2) await odrersAPIService.delete(order_2._id);
      if (customer_1) await customersApiService.delete(customer_1._id);
      if (customer_2) await customersApiService.delete(customer_2._id);
      if (product_1) await productsAPIService.delete(product_1._id);
      if (product_2) await productsAPIService.delete(product_2._id);
    }
  );
});
