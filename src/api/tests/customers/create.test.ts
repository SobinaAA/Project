import { createCustomerTestDataPositive } from '../../../data/customers/testData/create.data';
import { createCustomerTestDataNegative } from '../../../data/customers/testData/create.data';
import { oneCustomerSchema } from '../../../data/jsonSchemas/customer.schema';
import { ICustomer } from '../../../data/types/customers.types';
import { expect, test } from '../../../fixtures/apiServices.fixture';

import _ from 'lodash';
import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';
import { validationErrorSchema } from '../../../data/jsonSchemas/validationError.shema';

test.describe('[API] [Customers] [POST] [Positive]', async function () {
  let token = '';
  let id = '';
  test.beforeEach(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  createCustomerTestDataPositive.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ customersAPIController }) {
          const customerResponse = await customersAPIController.create(
            data,
            token
          );
          validateResponse(customerResponse, status, IsSuccess, ErrorMessage);
          id = customerResponse.body.Customer._id;
          validateJsonSchema(oneCustomerSchema, customerResponse);
          expect(
            _.omit(customerResponse.body.Customer, '_id', 'createdOn')
          ).toMatchObject({ ...data });
        }
      );
    }
  );

  test.afterEach(async function ({ customersApiService }) {
    if (id) {
      await customersApiService.delete(id);
    }
    id = '';
  });
});

test.describe('[API] [Customers] [POST] [Negative]', async function () {
  let token = '';

  test.beforeEach(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  createCustomerTestDataNegative.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ customersAPIController }) {
          const customerResponse = await customersAPIController.create(
            data as unknown as ICustomer,
            token
          );
          validateResponse(customerResponse, status, IsSuccess, ErrorMessage);

          validateJsonSchema(validationErrorSchema, customerResponse);
        }
      );
    }
  );
});
