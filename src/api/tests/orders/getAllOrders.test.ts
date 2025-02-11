import { test } from 'fixtures/apiServices.fixture';
// import _ from 'lodash';
import { TAGS } from 'data/tags';

test.describe('[API] [Orders] [Sorting and filtering list of the Orders]', async function () {
  let order_1: string;
  let order_2: string;
  let product_1: string;
  let product_2: string;
  let customer_1: string;
  let customer_2: string;

  test.beforeAll(async ({ signInApiService, odrersAPIService }) => {
    await signInApiService.loginAsAdmin();
    ({ order_1, order_2, product_1, product_2, customer_1, customer_2 } =
      await odrersAPIService.createRandomOrder());
  });

  test(
    'Should GET the complete list of customers without sorting and filtering ',
    { tag: ['@1O-API', '@alena-orders', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ odrersAPIService }) {
      await odrersAPIService.getAll();
    }
  );

  // let i = 2;
  // for (const keyField in _.omit(sortFieldCustomer, ['createdOn'])) {
  //   const tag = `@${i}C-API`;
  //   i++;
  //   test(
  //     `Should GET products filtred by ${keyField}`,
  //     { tag: [tag, '@alena-customers', TAGS.REGRESSION] },
  //     async function ({ customersApiService }) {
  //       const searchParam = customer_1[keyField] + '';
  //       const response = await customersApiService.getAll({
  //         search: searchParam
  //       });
  //       expect(
  //         response.body.Customers.some((prod) => prod._id === customer_1._id),
  //         'Should find 1st customer in the list'
  //       ).toBe(true);
  //     }
  //   );
  // }

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
      if (order_1) await odrersAPIService.delete(order_1);
      if (order_2) await odrersAPIService.delete(order_2);
      if (customer_1) await customersApiService.delete(customer_1);
      if (customer_2) await customersApiService.delete(customer_2);
      if (product_1) await productsAPIService.delete(product_1);
      if (product_2) await productsAPIService.delete(product_2);
      order_1 = '';
      order_2 = '';
      product_1 = '';
      product_2 = '';
      customer_1 = '';
      customer_2 = '';
    }
  );
});
