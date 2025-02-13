import { expect, test } from 'fixtures/apiServices.fixture';
import { TAGS } from 'data/tags';
import { IOrderFromResponse } from 'data/types/orders.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IProductFromResponse } from 'data/types/product.types';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { STATUS_CODES } from 'data/statusCodes';
import { ERRORS } from 'data/errorMesages';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';
import { simpleFaker } from '@faker-js/faker';
import {
  sortDir,
  sortFieldOrder,
  sortsASCDESC,
  sortsFieldOrder
} from 'data/types/requestParams';
import { sorting } from 'utils/orders/sorting';

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
    'Should GET orders filtred by Status',
    { tag: ['@7OC-API', '@alena-orders', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ odrersAPIService }) {
      const response = await odrersAPIService.getAll({
        status: order_1.status
      });
      expect(
        response.body.Orders.some((order) => order._id === order_1._id),
        'Should find 1st order in the list'
      ).toBe(true);
    }
  );

  let i = 8;
  for (const keyField in sortFieldOrder) {
    for (const keyDir in sortDir) {
      const tag = `@${i}O-API`;
      i++;
      test(
        `Should GET orders sorted by ${keyField} in ${keyDir} order`,
        { tag: [tag, '@alena-orders', TAGS.REGRESSION] },
        async function ({ odrersAPIService }) {
          const response = await odrersAPIService.getAll({
            sortField: keyField as sortsFieldOrder,
            sortOrder: keyDir as sortsASCDESC
          });
          const sortedResponse = sorting(
            response.body.Orders,
            keyField as sortsFieldOrder,
            keyDir as sortsASCDESC
          );
          expect(
            sortedResponse.every(
              (p, i) =>
                p[keyField as keyof typeof sortFieldOrder] ===
                response.body.Orders[i][keyField as keyof typeof sortFieldOrder]
            ),
            'Should match our and default sorting'
          ).toBe(true);
        }
      );
    }
  }

  test(
    'Should NOT GET the full list of orders with empty authorization token',
    { tag: ['@14O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const response = await ordersController.getAll('');
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, response);
    }
  );

  test(
    'Should NOT GET the full list of orders with incorrect authorization token',
    { tag: ['@15O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const incorrect_token = simpleFaker.string.alphanumeric(195);
      const response = await ordersController.getAll(incorrect_token);
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, response);
    }
  );

  test(
    'Should GET empty list of orders with invalid value for filtering by the status field',
    { tag: ['@16O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const randomSearch = simpleFaker.string.alphanumeric(4);
      const response = await odrersAPIService.getAll({
        status: randomSearch
      });
      expect(
        response.body.Orders.length,
        'Should get 0 orders (empty list)'
      ).toBe(0);
    }
  );

  test(
    'Should GET an empty list of orders by setting strict search string conditions',
    { tag: ['@17O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      const randomSearch = simpleFaker.string.alphanumeric(7);
      const response = await odrersAPIService.getAll({
        search: randomSearch
      });
      expect(
        response.body.Orders.length,
        'Should get 0 customers (empty list)'
      ).toBe(0);
    }
  );

  test(
    'Should GET not sorted orders list (incorrect sort field)',
    { tag: ['@18O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      await odrersAPIService.getAll({
        sortField: simpleFaker.string.alphanumeric(
          5
        ) as unknown as sortsFieldOrder,
        sortOrder: 'asc'
      });
    }
  );

  test(
    'Should GET not sorted orders list (incorrect sort order)',
    { tag: ['@19O-API', '@alena-orders', TAGS.REGRESSION] },
    async function ({ odrersAPIService }) {
      await odrersAPIService.getAll({
        sortField: 'status',
        sortOrder: simpleFaker.string.alpha(3) as unknown as sortsASCDESC
      });
    }
  );

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
