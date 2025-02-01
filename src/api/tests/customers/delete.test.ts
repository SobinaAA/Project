import { STATUS_CODES } from '../../../data/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { oneCustomerSchema } from '../../../data/jsonSchemas/customer.schema';
import { ICustomerFromResponse } from '../../../data/types/customers.types';
import { ERRORS } from '../../../data/errorMesages';
import _ from 'lodash';
import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';
import { validationErrorSchema } from '../../../data/jsonSchemas/validationError.shema';

test.describe('[API] [Customers] [Get Customer by ID]', async function () {
  let token: string;
  let customer: ICustomerFromResponse;

  test.beforeAll(async ({ signInApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
  });

  test.beforeEach(async ({ customersApiService }) => {
    customer = await customersApiService.create();
  });

  test('[1DI-API] Should DELETE the customer by correct ID', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.delete(customer._id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
    expect(response.body).toBe('');
  });

  test('[2DI-API] Should DELETE the customer by correct ID twice', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.delete(customer._id, token);
    const response2 = await customersAPIController.delete(customer._id, token);
    validateResponse(
      response2,
      STATUS_CODES.NOT_FOUND,
      false,
      ERRORS.CUSTOMER_NOT_FOUND(customer._id)
    );
    validateJsonSchema(validationErrorSchema, response2);
  });

  test('[3DI-API] Should NOT DELETE customer by incorrect ID', async function ({
    customersAPIController
  }) {
    const incorrectID = customer._id.slice(13) + Date.now();
    const response = await customersAPIController.delete(incorrectID, token);
    validateResponse(
      response,
      STATUS_CODES.NOT_FOUND,
      false,
      ERRORS.CUSTOMER_NOT_FOUND(incorrectID)
    );
    validateJsonSchema(validationErrorSchema, response);
  });

  test('[4DI-API] Should NOT DELETE the customer by ID with incorrect authorization token', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.delete(
      customer._id,
      token.slice(13) + Date.now()
    );
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(validationErrorSchema, response);
  });

  test('[5DI-API] Should NOT DELETE the customer by ID with empty authorization token', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.delete(customer._id, '');
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(validationErrorSchema, response);
  });
});
