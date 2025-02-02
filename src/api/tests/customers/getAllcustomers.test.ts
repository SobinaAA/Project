import { STATUS_CODES } from 'data/statusCodes';
import { test, expect } from 'fixtures/apiServices.fixture';
import { simpleFaker } from '@faker-js/faker';

import {
  sortFieldCustomer,
  sortDir,
  sortsASCDESC,
  sortsFieldCustomer
} from 'data/types/requestParams';

import { ICustomerFromResponse } from 'data/types/customers.types';
import { ERRORS } from 'data/errorMesages';
import _ from 'lodash';
import { sorting } from 'utils/customers/sorting';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';
import { TAGS } from 'data/tags';

let token: string;
let customer_1: ICustomerFromResponse;
let customer_2: ICustomerFromResponse;

test.describe('[API] [Customers] [Sorting and filtering list of the Products]', async function () {
  test.beforeAll(async ({ signInApiService, customersApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
    customer_1 = await customersApiService.create();
    customer_2 = await customersApiService.create();
  });

  test(
    'Should GET the complete list of customers without sorting and filtering ',
    { tag: ['@1C-API', '@alena-customers', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ customersApiService }) {
      await customersApiService.getAll();
    }
  );

  let i = 2;
  for (const keyField in _.omit(sortFieldCustomer, ['createdOn'])) {
    const tag = `@${i}C-API`;
    i++;
    test(
      `Should GET products filtred by ${keyField}`,
      { tag: [tag, '@alena-customers', TAGS.REGRESSION] },
      async function ({ customersApiService }) {
        const searchParam = customer_1[keyField] + '';
        const response = await customersApiService.getAll({
          search: searchParam
        });
        expect(
          response.body.Customers.some((prod) => prod._id === customer_1._id),
          'Should find 1st customer in the list'
        ).toBe(true);
      }
    );
  }

  test(
    'Should GET customers filtred by Country',
    { tag: ['@5C-API', '@alena-customers', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ customersApiService }) {
      const response = await customersApiService.getAll({
        country: customer_1.country
      });
      expect(
        response.body.Customers.some((prod) => prod._id === customer_1._id),
        'Should find 1st customer in the list'
      ).toBe(true);
    }
  );

  i = 6;
  for (const keyField in sortFieldCustomer) {
    for (const keyDir in sortDir) {
      const tag = `@${i}C-API`;
      i++;
      test(
        `Should GET customers sorted by ${keyField} in ${keyDir} order`,
        { tag: [tag, '@alena-customers', TAGS.REGRESSION] },
        async function ({ customersApiService }) {
          const response = await customersApiService.getAll({
            sortField: keyField as sortsFieldCustomer,
            sortOrder: keyDir as sortsASCDESC
          });
          const sortedResponse = sorting(
            response.body.Customers,
            keyField as sortsFieldCustomer,
            keyDir as sortsASCDESC
          );
          expect(
            sortedResponse.every(
              (p, i) =>
                p[keyField as keyof typeof sortFieldCustomer] ===
                response.body.Customers[i][
                  keyField as keyof typeof sortFieldCustomer
                ]
            ),
            'Should match our and default sorting'
          ).toBe(true);
        }
      );
    }
  }

  test(
    'Should NOT GET the full list of customers with empty authorization token',
    { tag: ['@14C-API', '@alena-customers', TAGS.REGRESSION] },
    async function ({ customersAPIController }) {
      const response = await customersAPIController.getAll('');
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
    'Should NOT GET the full list of customers with incorrect authorization token',
    { tag: ['@15C-API', '@alena-customers', TAGS.REGRESSION] },
    async function ({ customersAPIController }) {
      const incorrect_token = token.slice(13) + Date.now();
      const response = await customersAPIController.getAll(incorrect_token);
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
    'Should GET full list of customers with invalid value for filtering by the Country field',
    { tag: ['@16P-API', '@alena-customers', TAGS.REGRESSION] },
    async function ({ customersApiService }) {
      const randomSearch = simpleFaker.string.alphanumeric(7);
      const response = await customersApiService.getAll({
        country: randomSearch
      });
      expect(
        response.body.Customers.length,
        'Should get 0 customers (empty list)'
      ).toBe(0);
    }
  );

  test(
    'Should GET an empty list of customers by setting strict search string conditions',
    { tag: ['@17C-API', '@alena-customers', TAGS.REGRESSION] },
    async function ({ customersApiService }) {
      const randomSearch = simpleFaker.string.alphanumeric(7);
      const response = await customersApiService.getAll({
        search: randomSearch
      });
      expect(
        response.body.Customers.length,
        'Should get 0 customers (empty list)'
      ).toBe(0);
    }
  );

  test(
    'Should GET not sorted products list (incorrect sort field)',
    { tag: ['@18C-API', '@alena-customers', TAGS.REGRESSION] },
    async function ({ customersApiService }) {
      await customersApiService.getAll({
        sortField: simpleFaker.string.alphanumeric(
          5
        ) as unknown as sortsFieldCustomer,
        sortOrder: 'asc'
      });
    }
  );

  test(
    'Should GET not sorted customers list (incorrect sort order)',
    { tag: ['@19C-API', '@alena-customers-customers', TAGS.REGRESSION] },
    async function ({ customersApiService }) {
      await customersApiService.getAll({
        sortField: 'name',
        sortOrder: simpleFaker.string.alphanumeric(4) as unknown as sortsASCDESC
      });
    }
  );

  test.afterAll(async ({ customersAPIController }) => {
    if (customer_1._id)
      await customersAPIController.delete(customer_1._id, token);
    if (customer_2._id)
      await customersAPIController.delete(customer_2._id, token);
  });
});
