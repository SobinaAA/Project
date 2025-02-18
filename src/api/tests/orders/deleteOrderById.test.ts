import { STATUS_CODES } from 'data/statusCodes';
import { expect, test } from 'fixtures/apiServices.fixture';
import { ERRORS } from 'data/errorMesages';
import { validateResponse } from 'utils/validation/apiValidation';
import { TAGS } from 'data/tags';

test.describe('[API] [Orders] [DELETE the Order by Id]', async function () {
  let token = '';
  let orderId = '';

  test.beforeEach(async ({ signInApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
  });

  test(
    '1DE-ORD-API] Should DELETE the order by valid Id',
    { tag: ['@1DE-ORD-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ ordersController, odrersAPIService }) {
      const order = await odrersAPIService.createDraftOrder();
      orderId = order._id;
      const response = await ordersController.delete(orderId, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
      expect(response.body).toBe('');
      const response2 = await ordersController.getByID(orderId, token);
      validateResponse(
        response2,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.ORDER_NOT_FOUND(orderId)
      );
    }
  );

  test(
    '2DE-ORD-API] Should DELETE canceled order by valid Id',
    { tag: ['@1DE-ORD-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ ordersController, odrersAPIService }) {
      const order = await odrersAPIService.createCanceledOrder();
      orderId = order._id;
      const response = await ordersController.delete(orderId, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
      expect(response.body).toBe('');
      const response2 = await ordersController.getByID(orderId, token);
      validateResponse(
        response2,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.ORDER_NOT_FOUND(orderId)
      );
    }
  );

  test(
    '3DE-ORD-API] Should NOT DELETE the order by invalid Id',
    { tag: ['@2DE-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const response = await ordersController.delete(token, String(Date.now()));
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    '4DE-ORD-API] Should NOT DELETE the order without Id',
    { tag: ['@3DE-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const response = await ordersController.delete(token, '');
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    '5DE-ORD-API] Should NOT DELETE previously deleted order',
    { tag: ['@4DE-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ ordersController, odrersAPIService }) {
      const order = await odrersAPIService.createDraftOrder();
      orderId = order._id;
      await ordersController.delete(orderId, token);
      const response = await ordersController.delete(orderId, token);
      validateResponse(
        response,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.ORDER_NOT_FOUND(orderId)
      );
    }
  );
});
