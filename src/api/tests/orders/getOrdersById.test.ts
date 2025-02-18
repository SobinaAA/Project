import { STATUS_CODES } from 'data/statusCodes';
import { test } from 'fixtures/apiServices.fixture';
//import { orderSchema } from 'data/jsonSchemas/order.schema';
import { ERRORS } from 'data/errorMesages';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';
import { TAGS } from 'data/tags';

test.describe('[API] [Orders] [Get the Order by Id]', async function () {
  let token = '';
  let orderId = '';

  test.beforeEach(async ({ signInApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
  });

  test.afterEach(async function ({ ordersAPIService }) {
    if (orderId) {
      await ordersAPIService.delete(orderId);
    }
    orderId = '';
  });

  test(
    '1GE-ORD-API] Should GET the order by valid Id ',
    { tag: ['@1GE-ORD-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ ordersController, ordersAPIService }) {
      const order = await ordersAPIService.createDraftOrder();
      const response = await ordersController.getByID(order._id, token);
      validateResponse(response, STATUS_CODES.OK, true, null);
      // validateJsonSchema()
    }
  );

  test(
    '2GE-ORD-API] Should NOT GET the order by invalid Id ',
    { tag: ['@2GE-ORD-API', TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const response = await ordersController.getByID(
        token,
        String(Date.now())
      );
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, response);
    }
  );

  test(
    '3GE-ORD-API] Should NOT GET the order without Id ',
    { tag: ['@3GE-ORD-API', TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const response = await ordersController.getByID(token, '');
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, response);
    }
  );
});
