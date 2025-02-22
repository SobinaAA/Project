import { expect, test } from 'fixtures/apiServices.fixture';
import { IOrderFromResponse, IDelivery } from 'data/types/orders.types';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { oneOrderSchema } from 'data/jsonSchemas/order.schema';
import { STATUS_CODES } from 'data/statusCodes';
import { ERRORS } from 'data/errorMesages';
import { TAGS } from 'data/tags';
import { generateDelivery } from 'utils/order/generateDelivery';
import moment from 'moment';

test.describe('[API] [Orders] [Delivery] [Positive] [POST]', () => {
  let order: IOrderFromResponse;
  let token = '';

  test.beforeAll(async ({ signInApiService, ordersAPIService }) => {
    token = await signInApiService.loginAsAdmin();
    order = await ordersAPIService.createDraftOrder();
  });

  test(
    'Should update delivery details successfully with valid data',
    { tag: ['@order-delivery-positive', TAGS.REGRESSION, TAGS.SMOKE,] },
    async ({ ordersController }) => {
      const delivery: IDelivery = generateDelivery();
      const result = await ordersController.updateDelivery(
        order._id,
        delivery,
        token
      );
      validateResponse(result, STATUS_CODES.OK, true, null);
      validateJsonSchema(oneOrderSchema, result);

      expect(result.body.Order.delivery).not.toBeNull();
      const updatedDelivery = result.body.Order.delivery!;

      const expectedDate = moment(delivery.finalDate, 'YYYY/MM/DD').format(
        'YYYY-MM-DD'
      );
      const receivedDate = moment(updatedDelivery.finalDate).format(
        'YYYY-MM-DD'
      );
      expect(receivedDate).toEqual(expectedDate);

      expect(updatedDelivery).toEqual(
        expect.objectContaining({
          condition: delivery.condition,
          address: delivery.address
        })
      );
    }
  );

  test.afterAll(async ({ ordersAPIService }) => {
    if (order) await ordersAPIService.delete(order._id);
  });
});

test.describe('[API] [Orders] [Delivery] [Negative] [POST]', () => {
  let order: IOrderFromResponse;
  let token = '';

  test.beforeAll(async ({ signInApiService, ordersAPIService }) => {
    token = await signInApiService.loginAsAdmin();
    order = await ordersAPIService.createDraftOrder();
  });

  test(
    'Should not update delivery details without token',
    { tag: ['@order-delivery-negative', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const delivery = generateDelivery();
      const result = await ordersController.updateDelivery(
        order._id,
        delivery,
        ''
      );
      validateResponse(
        result,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    'Should not update delivery details with invalid order id',
    { tag: ['@order-delivery-negative', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const invalidID = '67adf2639f31117d8c54c143';
      const delivery = generateDelivery();
      const result = await ordersController.updateDelivery(
        invalidID,
        delivery,
        token
      );
      validateResponse(
        result,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.ORDER_NOT_FOUND(invalidID)
      );
    }
  );

  test(
    'Should not update delivery details with invalid finalDate format',
    { tag: ['@order-delivery-negative', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const delivery = generateDelivery();
      delivery.finalDate = 'invalid-date';
      const result = await ordersController.updateDelivery(
        order._id,
        delivery,
        token
      );
      validateResponse(
        result,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_FINAL_DATE
      );
    }
  );

  test(
    'Should not update delivery details with invalid address details',
    { tag: ['@order-delivery-negative', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const delivery = generateDelivery();
      if (delivery.address) {
        delivery.address.city = '';
        delivery.address.street = '';
        delivery.address.house = -10;
        delivery.address.flat = -5;
      }
      const result = await ordersController.updateDelivery(
        order._id,
        delivery,
        token
      );
      validateResponse(
        result,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_DELIVERY
      );
    }
  );

  test.afterAll(async ({ ordersAPIService }) => {
    if (order) await ordersAPIService.delete(order._id);
  });
});
