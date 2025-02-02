import { STATUS_CODES } from 'data/statusCodes';
import { test } from 'fixtures/apiServices.fixture';
import { oneCustomerSchema } from 'data/jsonSchemas/customer.schema';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { ERRORS } from 'data/errorMesages';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';

test.describe('[API] [Customers] [Get Customer by ID]', async function () {
  let token: string;
  let customer: ICustomerFromResponse;

  test.beforeAll(async ({ signInApiService, customersApiService }) => {
    token = await signInApiService.loginAsAdmin();
    customer = await customersApiService.create();
  });

  test('[1CI-API] Should GET the customer by correct ID', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getByID(customer._id, token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneCustomerSchema, response);
  });

  test('[2CI-API] Should NOT GET the customer by ID with incorrect authorization token', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getByID(
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

  test('[3CI-API] Should NOT GET the customer by ID with empty authorization token', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.getByID(customer._id, '');
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(validationErrorSchema, response);
  });

  test('[4CI-API] Should NOT GET customer by incorrect ID', async function ({
    customersAPIController
  }) {
    const incorrectID = customer._id.slice(13) + Date.now();
    const response = await customersAPIController.getByID(incorrectID, token);
    validateResponse(
      response,
      STATUS_CODES.NOT_FOUND,
      false,
      ERRORS.CUSTOMER_NOT_FOUND(incorrectID)
    );
    validateJsonSchema(validationErrorSchema, response);
  });

  test.afterAll(async ({ customersAPIController }) => {
    await customersAPIController.delete(customer._id, token);
  });
});
