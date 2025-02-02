import { STATUS_CODES } from 'data/statusCodes';
import { test, expect } from 'fixtures/apiServices.fixture';
import { oneCustomerSchema } from 'data/jsonSchemas/customer.schema';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { ERRORS } from 'data/errorMesages';

import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';
import { validationErrorSchema } from '../../../data/jsonSchemas/validationError.shema';

test.describe('[API] [Customers] [DELETE Customer by ID]', async function () {
  let token: string;
  let customer: ICustomerFromResponse;

  test.beforeAll(async ({ signInApiService }) => {
    token = await signInApiService.loginAsAdmin();
  });

  test.beforeEach(async ({ customersApiService }) => {
    customer = await customersApiService.create();
  });

  test('[1DI-API] Should DELETE the customer by correct ID', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.delete(customer._id, token);
    validateResponse(response, STATUS_CODES.DELETED);
    expect(response.body).toBe('');

    // Проверяем, что кастомер удалился
    const response2 = await customersAPIController.getByID(customer._id, token);
    validateResponse(
      response2,
      STATUS_CODES.NOT_FOUND,
      false,
      ERRORS.CUSTOMER_NOT_FOUND(customer._id)
    );
    validateJsonSchema(validationErrorSchema, response2);
  });

  test('[2DI-API] Should NOT DELETE the customer by correct ID twice', async function ({
    customersAPIController
  }) {
    const response = await customersAPIController.delete(customer._id, token);
    validateResponse(response, STATUS_CODES.DELETED);
    const response2 = await customersAPIController.delete(customer._id, token);
    validateResponse(
      response2,
      STATUS_CODES.NOT_FOUND,
      false,
      ERRORS.CUSTOMER_NOT_FOUND(customer._id)
    );
    validateJsonSchema(validationErrorSchema, response2);

    // Проверяем, что кастомер удалился в первом запросе Delete
    const response3 = await customersAPIController.getByID(customer._id, token);
    validateResponse(
      response3,
      STATUS_CODES.NOT_FOUND,
      false,
      ERRORS.CUSTOMER_NOT_FOUND(customer._id)
    );
    validateJsonSchema(validationErrorSchema, response3);
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

    // Проверяем, что кастомер не удалился
    const response2 = await customersAPIController.getByID(customer._id, token);
    validateResponse(response2, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneCustomerSchema, response2);
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

    // Проверяем, что кастомер не удалился
    const response2 = await customersAPIController.getByID(customer._id, token);
    validateResponse(response2, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneCustomerSchema, response2);
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

    // Проверяем, что кастомер не удалился
    const response2 = await customersAPIController.getByID(customer._id, token);
    validateResponse(response2, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneCustomerSchema, response2);
  });

  test.afterAll(async ({ customersAPIController }) => {
    if (customer._id) {
      await customersAPIController.delete(customer._id, token);
    }
  });
});
