import { STATUS_CODES } from '../../../data/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { simpleFaker } from '@faker-js/faker';

import {
  sortFieldCustomer,
  sortDir,
  sortsASCDESC,
  sortsFieldCustomer
} from '../../../data/types/requestParams';

import { allCustomersResponseSchema } from '../../../data/jsonSchemas/customer.schema';
import { ICustomerFromResponse } from '../../../data/types/customers.types';
import { ERRORS } from '../../../data/errorMesages';
import _ from 'lodash';
import { sorting } from '../../../utils/customers/sorting';
import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';
import { validationErrorSchema } from '../../../data/jsonSchemas/validationError.shema';

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

  test('[1C-API] Should GET the complete list of customers without sorting and filtering ', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll(token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
  });

  for (const keyField in _.omit(sortFieldCustomer, ['createdOn'])) {
    test(`[2P-API] - [4P-API] Should GET products filtred by ${keyField}`, async function ({
      customersAPIController
    }) {
      const searchParam = customer_1[keyField] + '';
      const response = await customersAPIController.getAll(token, {
        search: searchParam
      });
      validateResponse(response, STATUS_CODES.OK, true, null);
      validateJsonSchema(allCustomersResponseSchema, response);
      expect(
        response.body.Customers.some((prod) => prod._id === customer_1._id),
        'Should find 1st customer in the list'
      ).toBe(true);
    });
  }

  test('[5C-API] Should GET customers filtred by Country', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll(token, {
      country: customer_1.country
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
    expect(
      response.body.Customers.some((prod) => prod._id === customer_1._id),
      'Should find 1st customer in the list'
    ).toBe(true);
  });

  for (const keyField in sortFieldCustomer) {
    for (const keyDir in sortDir) {
      test(`[6C-API] - [13C-API] Should GET customers sorted by ${keyField} in ${keyDir} order`, async function ({
        customersAPIController
      }) {
        const response = await customersAPIController.getAll(token, {
          sortField: keyField as sortsFieldCustomer, 
          sortOrder: keyDir as sortsASCDESC
        });
        validateResponse(response, STATUS_CODES.OK, true, null);
        validateJsonSchema(allCustomersResponseSchema, response);
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
      });
    }
  }

  test('[14P-API] Should NOT GET the full list of customers with empty authorization token', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll('');
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(validationErrorSchema, response);
  });

  test('[15P-API] Should NOT GET the full list of customers with incorrect authorization token', async function ({
    customersAPIController
  }) {
    const incorrect_token = token.slice(13) + Date.now();
    const response = await customersAPIController.getAll(incorrect_token);
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(validationErrorSchema, response);
  });

  test('[16C-API] Should GET full list of customers with invalid value for filtering by the Country field', async function ({
    customersAPIController
  }) {
    const randomSearch = simpleFaker.string.alphanumeric(7);
    const response = await customersAPIController.getAll(token, {
      country: randomSearch
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
    expect(
      response.body.Customers.length,
      'Should get 0 customers (empty list)'
    ).toBe(0);
  });

  test('[17C-API] Should GET an empty list of customers by setting strict search string conditions', async function ({
    customersAPIController
  }) {
    const randomSearch = simpleFaker.string.alphanumeric(7);
    const response = await customersAPIController.getAll(token, {
      search: randomSearch
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
    expect(
      response.body.Customers.length,
      'Should get 0 customers (empty list)'
    ).toBe(0);
  });

  test('[18C-API] Should GET not sorted products list (incorrect sort field)', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll(token, {
      sortField: simpleFaker.string.alphanumeric(5) as unknown as sortsFieldCustomer,
      sortOrder: 'asc'
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
  });

  test('[19C-API] Should GET not sorted customers list (incorrect sort order)', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll(token, {
      sortField: 'name',
      sortOrder: simpleFaker.string.alphanumeric(4) as unknown as sortsASCDESC
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
  });

  test.afterAll(async ({ customersAPIController }) => {
    await customersAPIController.delete(customer_1._id, token);
    await customersAPIController.delete(customer_2._id, token);
  });
});
