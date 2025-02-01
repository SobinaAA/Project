import { updateCustomerTestDataNegative } from '../../../data/customers/testData/update.data';
import { updateCustomerTestDataPositive } from '../../../data/customers/testData/update.data';
import { oneCustomerSchema } from '../../../data/jsonSchemas/customer.schema';
import { ICustomer } from '../../../data/types/customers.types';
import { expect, test } from '../../../fixtures/apiServices.fixture';

import _ from 'lodash';
import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';
import { validationErrorSchema } from '../../../data/jsonSchemas/validationError.shema';
import { generateNewCustomer } from '../../../data/customers/generateCustomer';

test.describe('[API] [Customers] [PUT] [Positive]', async function () {
  let token = '';
  let id = '';
  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  updateCustomerTestDataPositive.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ customersAPIController, customersApiService }) {
          const createdCustomer = await customersApiService.create();
          const customerResponse = await customersAPIController.update({
            id: createdCustomer._id,
            token,
            body: generateNewCustomer({
              ..._.omit(createdCustomer, 'createdOn', '_id'),
              ...data
            })
          });
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

test.describe('[API] [Customers] [PUT] [Negative]', async function () {
  let token = '';
  let id = '';
  test.beforeEach(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  updateCustomerTestDataNegative.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ customersAPIController, customersApiService }) {
          const createdCustomer = await customersApiService.create();
          const customerResponse = await customersAPIController.update({
            id: createdCustomer._id,
            token,
            body: generateNewCustomer({
              ..._.omit(createdCustomer, 'createdOn', '_id'),
              ...(data as unknown as ICustomer)
            })
          });
          validateResponse(customerResponse, status, IsSuccess, ErrorMessage);
          id = createdCustomer._id;
          validateJsonSchema(validationErrorSchema, customerResponse);
        }
      );
    }
  );
});
