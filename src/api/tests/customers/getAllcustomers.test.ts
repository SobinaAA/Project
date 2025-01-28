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

  test.only('[1C-API] GET the complete list of customers without sorting and filtering ', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getAll(token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
  });

  for (const keyField in sortFieldCustomer) {
    for (const keyDir in sortDir) {
      test(`Should get customers sorted by ${keyField} in ${keyDir} order`, async function ({
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
