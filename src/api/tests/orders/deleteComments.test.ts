import { simpleFaker } from '@faker-js/faker';
import { ERRORS } from 'data/errorMesages';
import { STATUS_CODES } from 'data/statusCodes';
import { TAGS } from 'data/tags';
import { IOrderFromResponse } from 'data/types/orders.types';
import { expect, test } from 'fixtures/apiServices.fixture';
import { validateResponse } from 'utils/validation/apiValidation';

test.describe('[API] [Orders] [Comments] [Positive] [POST]', async function () {
  let order: IOrderFromResponse;
  let commentId = '';
  const text = simpleFaker.string.alphanumeric(15);

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: odrersAPIService }) => {
      await signInApiService.loginAsAdmin();
      ({ order } = await odrersAPIService.createRandomOrder());
    }
  );

  test.beforeEach(async ({ ordersAPIService }) => {
    order = await ordersAPIService.addComment(order._id, text);
    const comments = order.comments;
    comments.forEach((comm) => {
      if (comm.text === text) commentId = comm._id;
    });
  });

  test(
    'Shoud delete comment',
    {
      tag: [
        '@6OComPos-API',
        '@alena-order-comments-delete',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersAPIService }) {
      await ordersAPIService.deleteComment(order._id, commentId);
      const newOrder = await ordersAPIService.getByID(order._id);
      const comments = newOrder.comments;
      expect(comments.some((comment) => comment._id === commentId)).not.toBe(
        true
      );
    }
  );
  test.afterAll(async ({ ordersAPIService }) => {
    if (order) await ordersAPIService.delete(order._id);
  });
});

test.describe('[API] [Orders] [Comments] [Negative] [POST]', async function () {
  let order: IOrderFromResponse;
  let token = '';
  let commentId = '';
  const text = simpleFaker.string.alphanumeric(15);

  test.beforeAll(async ({ signInApiService, ordersAPIService }) => {
    token = await signInApiService.loginAsAdmin();
    ({ order } = await ordersAPIService.createRandomOrder());
    order = await ordersAPIService.addComment(order._id, text);
    const comments = order.comments;
    comments.forEach((comm) => {
      if (comm.text === text) commentId = comm._id;
    });
  });

  test(
    'Shoud not delete comment with incorrect id comment for real order',
    {
      tag: [
        '@5OComNeg-API',
        '@alena-order-comments-delete',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const incorrectId = commentId.slice(-2) + simpleFaker.string.numeric(2);

      const result = await ordersController.deleteComment(
        order._id,
        incorrectId,
        token
      );
      validateResponse(
        result,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.COMMENT_NOT_FOUND
      ); //Некорректное поведение системы!!!
      const newOrder = await ordersController.getByID(order._id, token);
      const comments = newOrder.body.Order.comments;
      expect(comments.some((comment) => comment._id === commentId)).toBe(true);
    }
  );

  test(
    'Shoud not delete comment with correct id comment for not correct order',
    {
      tag: [
        '@6OComNeg-API',
        '@alena-order-comments-delete',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const incorrectId = order._id.slice(13) + Date.now();
      const result = await ordersController.deleteComment(
        incorrectId,
        commentId,
        token
      );
      validateResponse(
        result,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.ORDER_NOT_FOUND(incorrectId)
      );
      const newOrder = await ordersController.getByID(order._id, token);
      const comments = newOrder.body.Order.comments;
      expect(comments.some((comment) => comment._id === commentId)).toBe(true);
    }
  );

  test(
    'Shoud not delete comment twice',
    {
      tag: [
        '@6OComNeg-API',
        '@alena-order-comments-delete',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      await ordersController.deleteComment(order._id, commentId, token);
      const newOrder = await ordersController.getByID(order._id, token);
      const comments = newOrder.body.Order.comments;
      expect(comments.some((comment) => comment._id === commentId)).not.toBe(
        true
      );
      const response = await ordersController.deleteComment(
        order._id,
        commentId,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.COMMENT_NOT_FOUND
      ); //Некорректное поведение системы!!!
    }
  );

  test(
    'Shoud not delete comment with no token',
    {
      tag: [
        '@1OComNeg-API',
        '@alena-order-comments-delete',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const result = await ordersController.deleteComment(
        order._id,
        commentId,
        ''
      );
      validateResponse(
        result,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      const newOrder_1 = await ordersController.getByID(order._id, token);
      const comments = newOrder_1.body.Order.comments;
      expect(comments.some((comment) => comment._id === commentId)).toBe(true);
    }
  );

  test(
    'Shoud not delete comment with invalid token',
    {
      tag: [
        '@2OComNeg-API',
        '@alena-order-comments-delete',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({ ordersController }) {
      const invalidToken = simpleFaker.string.alphanumeric(195);
      const result = await ordersController.deleteComment(
        order._id,
        commentId,
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
      expect(comments.some((comment) => comment._id === commentId)).toBe(true);
    }
  );

  test.afterAll(async ({ ordersAPIService }) => {
    if (order) await ordersAPIService.delete(order._id);
  });
});
