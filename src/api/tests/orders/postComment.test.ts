import { expect, test } from 'fixtures/apiServices.fixture';

import { IOrderFromResponse } from 'data/types/orders.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IProductFromResponse } from 'data/types/product.types';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { createCommentPositive } from 'data/orders/testData/comments.data';
import { oneOrderSchema } from 'data/jsonSchemas/order.schema';
import { STATUS_CODES } from 'data/statusCodes';
import { ERRORS } from 'data/errorMesages';
import { TAGS } from 'data/tags';
import { simpleFaker } from '@faker-js/faker';

test.describe('[API] [Orders] [Comments] [Positive] [POST]', async function () {
  let order: IOrderFromResponse;
  let product: IProductFromResponse;
  let customer: ICustomerFromResponse;
  let token = '';

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: odrersAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      ({ order, customer, product } =
        await odrersAPIService.createRandomOrder());
    }
  );

  for (const {
    testName,
    tags,
    text,
    status,
    ErrorMessage,
    IsSuccess
  } of createCommentPositive) {
    test(testName, { tag: [...tags] }, async function ({ ordersController }) {
      const result = await ordersController.addComment(order._id, text, token);
      validateResponse(result, status, IsSuccess, ErrorMessage);
      validateJsonSchema(oneOrderSchema, result);
      const comments = result.body.Order.comments;
      expect(comments.some((comment) => comment.text === text)).toBe(true);
    });
  }

  test.afterAll(
    async ({
      ordersAPIService: odrersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      if (order) await odrersAPIService.delete(order._id);
      if (customer) await customersApiService.delete(customer._id);
      if (product) await productsAPIService.delete(product._id);
    }
  );
});

test.describe('[API] [Orders] [Comments] [Negative] [POST]', async function () {
  let order: IOrderFromResponse;
  let product: IProductFromResponse;
  let customer: ICustomerFromResponse;
  let token = '';

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: odrersAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      ({ order, customer, product } =
        await odrersAPIService.createRandomOrder());
    }
  );

  test(
    'Shoud not create comment with no token',
    {
      tag: [
        '@1OComNeg-API',
        '@alena-order-comments',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const result = await ordersController.addComment(order._id, '123', '');
      validateResponse(
        result,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      const newOrder_1 = await ordersController.getByID(order._id, token);
      const comments = newOrder_1.body.Order.comments;
      expect(comments.some((comment) => comment.text === '')).not.toBe(true);
    }
  );

  test(
    'Shoud not create comment with invalid token',
    {
      tag: [
        '@2OComNeg-API',
        '@alena-order-comments',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const invalidToken = simpleFaker.string.alphanumeric(195);
      const result = await ordersController.addComment(
        order._id,
        '123',
        invalidToken
      );
      validateResponse(
        result,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      const newOrder_1 = await ordersController.getByID(order._id, token);
      const comments = newOrder_1.body.Order.comments;
      expect(comments.some((comment) => comment.text === '123')).not.toBe(true);
    }
  );

  test(
    'Shoud not create empty comment',
    {
      tag: [
        '@3OComNeg-API',
        '@alena-order-comments',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const result = await ordersController.addComment(order._id, '', token);
      validateResponse(
        result,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
      const newOrder_1 = await ordersController.getByID(order._id, token);
      const comments = newOrder_1.body.Order.comments;
      expect(comments.some((comment) => comment.text === '')).not.toBe(true);
    }
  );

  test(
    'Shoud not create comment for incorrect Order id',
    {
      tag: [
        '@4OComNeg-API',
        '@alena-order-comments',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const invalidID = '67adf2639f31117d8c54c143';
      const result = await ordersController.addComment(
        invalidID,
        '123123',
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

  test.afterAll(
    async ({
      ordersAPIService: odrersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      if (order) await odrersAPIService.delete(order._id);
      if (customer) await customersApiService.delete(customer._id);
      if (product) await productsAPIService.delete(product._id);
    }
  );
});
