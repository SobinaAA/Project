import { STATUS_CODES } from '../../../data/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';

import {
  sortFieldCustomer,
  sortDir,
  sortsASCDESC,
  sortsFieldCustomer
} from '../../../data/types/requestParams';
import {
  validateJsonSchema,
  validateResponse
} from '../../services/validation/apiValidation';
import { allCustomersResponseSchema } from '../../../data/jsonSchemas/customer.schema';
import { ICustomerFromResponse } from '../../../data/types/customers.types';
import { simpleSchemaPart } from '../../../data/jsonSchemas/base.schema';

test.describe('[API] [Customers] [Sorting and filtering list of the Products]', async function () {
  let token: string;
  let customer_1: ICustomerFromResponse;
  let customer_2: ICustomerFromResponse;

  test.beforeAll(async ({ signInApiService, customersApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
    customer_1 = await customersApiService.create();
    customer_2 = await customersApiService.create();
  });

  test.skip('[1C-API] GET the complete list of customers without sorting and filtering ', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll(token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
  });

  test.skip('[14P-API] Trying to GET the full list of customers with empty authorization token', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll('');
    validateResponse(response, STATUS_CODES.NOT_AUTHORIZED, false, 'Not authorized');
    validateJsonSchema(simpleSchemaPart, response);
  });

  test.skip('[15P-API] Trying to GET the full list of customers with incorrect authorization token', async function ({
    customersAPIController
  }) {
    const incorrect_token = token.slice(13) + Date.now();
    const response = await customersAPIController.getAll(incorrect_token);
    validateResponse(response, STATUS_CODES.NOT_AUTHORIZED, false, 'Not authorized');
    validateJsonSchema(simpleSchemaPart, response);
  });


  for (const keyField in sortFieldCustomer) {
    for (const keyDir in sortDir) {
      test.skip(`Should get customers sorted by ${keyField} in ${keyDir} order`, async function ({
        customersAPIController
      }) {
        const response = await customersAPIController.getAll(token, {
          sortField: keyField,
          sortOrder: keyDir as sortsASCDESC
        });
        validateResponse(response, STATUS_CODES.OK, true, null);
        validateJsonSchema(allCustomersResponseSchema, response);
        const sortedResponse = await customersAPIController.sorting(
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
          )
        ).toBe(true);
      });
    }
  }

  test.afterAll(async ({ customersAPIController }) => {
    await customersAPIController.delete(customer_1._id, token);
    await customersAPIController.delete(customer_2._id, token);
  });
});
