import { generateNewCustomer } from '../../../data/customers/generateCustomer';
import { allCustomersResponseSchema } from '../../../data/jsonSchemas/customer.schema';
import { STATUS_CODES } from '../../../data/statusCodes';
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
  test('Shoud create customer with smoke data', async function ({
    signInApiService,
    customersAPIController
  }) {
    const customerData = generateNewCustomer();
    const customerResponse = await customersAPIController.create(
      customerData,
      token
    );
    validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
    id = customerResponse.body.Customer._id;
    validateJsonSchema(allCustomersResponseSchema, customerResponse);
    expect(
      _.omit(customerResponse.body.Customer, '_id', 'createdOn')
    ).toMatchObject({ ...customerData });
  });
  test.afterEach(async function ({ customersApiService }) {
    if (id) {
      await customersApiService.delete(id);
    }
    id = '';
  });
});
