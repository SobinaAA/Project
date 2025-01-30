import { createCustomerTestDataPositive } from '../../../data/customers/testData/create.data';
import { allCustomersResponseSchema } from '../../../data/jsonSchemas/customer.schema';
import { expect, test } from '../../../fixtures/apiServices.fixture';
import {
  validateJsonSchema,
  validateResponse
} from '../../services/validation/apiValidation';
import _ from 'lodash';

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
        { tag: [...tags]},
        async function ({ customersAPIController }) {
          const customerResponse = await customersAPIController.create(
            data,
            token
          );
          validateResponse(customerResponse, status, IsSuccess, ErrorMessage);
          id = customerResponse.body.Customer._id;
          validateJsonSchema(allCustomersResponseSchema, customerResponse);
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
