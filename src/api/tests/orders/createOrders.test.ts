import { test } from 'fixtures/apiServices.fixture';
import { TAGS } from 'data/tags';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { oneOrderSchema } from 'data/jsonSchemas/order.schema';
import { STATUS_CODES } from 'data/statusCodes';
import { IOrderData } from 'data/types/orders.types';
import { ERRORS } from 'data/errorMesages';

test.describe('[API] [Orders] [POST] [Positive]', async function () {
  let customerId: string;
  let productId_1: string;
  let productId_2: string;
  let orderId: string;
  let token: string;

  test.beforeEach(
    async ({ signInApiService, customersApiService, productsAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      const customer = await customersApiService.create();
      customerId = customer._id;
      const product1 = await productsAPIService.create();
      productId_1 = product1._id;
      const product2 = await productsAPIService.create();
      productId_2 = product2._id;
    }
  );

  test(
    'Creating an order with valid data (one product)',
    { tag: ['@1POSTORDER-API', '@tania-api', TAGS.REGRESSION, TAGS.SMOKE] },
    async ({ ordersController }) => {
      const orderData = { customer: customerId, products: [productId_1] };
      const orderResponse = await ordersController.create(orderData, token);
      orderId = orderResponse.body.Order._id;

      validateResponse(orderResponse, STATUS_CODES.CREATED, true, null);
      validateJsonSchema(oneOrderSchema, orderResponse);
    }
  );

  test(
    'Creating an order with valid data (multiple products)',
    { tag: ['@2POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const orderData = {
        customer: customerId,
        products: [productId_1, productId_2]
      };
      const orderResponse = await ordersController.create(orderData, token);
      orderId = orderResponse.body.Order._id;

      validateResponse(orderResponse, STATUS_CODES.CREATED, true, null);
      validateJsonSchema(oneOrderSchema, orderResponse);
    }
  );

  test(
    'Creating an order with duplicate products',
    { tag: ['@3POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const orderData = {
        customer: customerId,
        products: [productId_1, productId_1]
      };
      const orderResponse = await ordersController.create(orderData, token);
      orderId = orderResponse.body.Order._id;

      validateResponse(orderResponse, STATUS_CODES.CREATED, true, null);
      validateJsonSchema(oneOrderSchema, orderResponse);
    }
  );

  test.afterEach(
    async ({ customersApiService, ordersController, productsAPIService }) => {
      orderId && (await ordersController.delete(orderId, token));
      productId_1 && (await productsAPIService.delete(productId_1));
      productId_2 && (await productsAPIService.delete(productId_2));
      customerId && (await customersApiService.delete(customerId));
      orderId = productId_1 = productId_2 = customerId = '';
    }
  );
});

test.describe('[API] [Orders] [POST] [Negative]', async function () {
  let token: string;

  test.beforeAll(async ({ signInApiService }) => {
    token = await signInApiService.loginAsAdmin();
  });

  test(
    'The customer field is missing',
    { tag: ['@4POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ productsAPIService, ordersController }) => {
      const product = await productsAPIService.create();
      const orderData = { products: [product._id] };
      const orderResponse = await ordersController.create(
        orderData as IOrderData,
        token
      );
      validateResponse(
        orderResponse,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'The products field is missing',
    { tag: ['@5POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ customersApiService, ordersController }) => {
      const customer = await customersApiService.create();
      const orderData = { customer: customer._id };
      const orderResponse = await ordersController.create(
        orderData as IOrderData,
        token
      );
      validateResponse(
        orderResponse,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Incorrect customer format (e.g. number instead of string)',
    { tag: ['@6POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ productsAPIService, ordersController }) => {
      const product = await productsAPIService.create();
      const orderData = { customer: 12345, products: [product._id] } as unknown;
      const orderResponse = await ordersController.create(
        orderData as IOrderData,
        token
      );
      validateResponse(
        orderResponse,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Incorrect format of identifier in products array',
    { tag: ['@7POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ customersApiService, ordersController }) => {
      const customer = await customersApiService.create();
      const orderData = {
        customer: customer._id,
        products: [12345]
      } as unknown;
      const orderResponse = await ordersController.create(
        orderData as IOrderData,
        token
      );
      validateResponse(
        orderResponse,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Missing/invalid authorization token',
    { tag: ['@8POSTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ customersApiService, productsAPIService, ordersController }) => {
      const customer = await customersApiService.create();
      const product = await productsAPIService.create();
      const orderData = { customer: customer._id, products: [product._id] };
      const invalidToken = 'invalid_token';
      const orderResponse = await ordersController.create(
        orderData,
        invalidToken
      );
      validateResponse(
        orderResponse,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );
});
