import { expect, test } from 'fixtures/apiServices.fixture';

import { ORDER_STATUSES } from 'data/types/orders.types';
import { validateResponse } from 'utils/validation/apiValidation';
import { STATUS_CODES } from 'data/statusCodes';
import { ERRORS } from 'data/errorMesages';
import { TAGS } from 'data/tags';
import { simpleFaker } from '@faker-js/faker';

test.describe('[API] [Orders] [Received Products] [Positive] [POST] Mark 1 product (of 1) as receieved ', async function () {
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(async ({ ordersAPIService: ordersAPIService }) => {
    const createdOrder = await ordersAPIService.createInProsessOrder();
    orderId = createdOrder._id;
    customerId = createdOrder.customer._id;
    products = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Should mark 1 product as received (of 1)',
    {
      tag: [
        '@1ReceievedProducts_ORDER-API',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersAPIService }) => {
      const response = await ordersAPIService.receiveProducts(
        orderId,
        products
      );
      expect(response.body.Order.products[0].received).toBeTruthy();
      expect(response.body.Order.status).toBe(ORDER_STATUSES.RECEIVED);
    }
  );

  test.afterAll(
    async ({
      ordersAPIService: ordersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      orderId && (await ordersAPIService.delete(orderId));
      customerId && (await customersApiService.delete(customerId));
      for (const pId of products) {
        pId && (await productsAPIService.delete(pId));
      }
    }
  );
});

test.describe('[API] [Orders] [Received Products] [Positive] [POST] Mark 1 product (of 2) as receieved ', async function () {
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(async ({ ordersAPIService: ordersAPIService }) => {
    const createdOrder = await ordersAPIService.createInProsessOrder(2);
    orderId = createdOrder._id;
    customerId = createdOrder.customer._id;
    products = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Should mark 1 product as received (of 2)',
    {
      tag: [
        '@2ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersAPIService }) => {
      const arrOfOneProduct: string[] = [];
      arrOfOneProduct.push(products[0]);
      const response = await ordersAPIService.receiveProducts(
        orderId,
        arrOfOneProduct
      );
      expect(response.body.Order.products[0].received).toBeTruthy();
      expect(response.body.Order.status).toBe(
        ORDER_STATUSES.PARTIALLY_RECEIVED
      ); //Невозможно обновить статус у обоих товаров
    }
  );

  test.afterAll(
    async ({
      ordersAPIService: ordersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      orderId && (await ordersAPIService.delete(orderId));
      customerId && (await customersApiService.delete(customerId));
      products[0] && (await productsAPIService.delete(products[0])); //В заказ добавлено два идентичных товара
    }
  );
});

test.describe('[API] [Orders] [Received Products] [Negative] [POST] Recieved Status of the Order', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: ordersAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createInProsessOrder();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should NOT mark product as received from RECEIEVED ORDER (Status "Received")',
    {
      tag: [
        '@3ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersAPIService, ordersController }) => {
      await ordersAPIService.receiveProducts(orderId, products);
      const response = await ordersController.receiveProducts(
        orderId,
        products,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_ORDER_STATUS
      );
    }
  );

  test.afterAll(
    async ({
      ordersAPIService: ordersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      orderId && (await ordersAPIService.delete(orderId));
      customerId && (await customersApiService.delete(customerId));
      for (const pId of products) {
        pId && (await productsAPIService.delete(pId));
      }
    }
  );
});

test.describe('[API] [Orders] [Received Products] [Negative] [POST] Canceled Status of the Order', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: ordersAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createCanceledOrder();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  //ТЕСТ ПАДАЕТ потому что баг, а не потому, что тест плохой
  //Не править!!!
  test(
    'Should NOT mark product as received from CANCELED ORDER (Status "Canceled")',
    {
      tag: [
        '@4ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.receiveProducts(
        orderId,
        products,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_ORDER_STATUS
      );
    }
  );

  test.afterAll(
    async ({
      ordersAPIService: ordersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      orderId && (await ordersAPIService.delete(orderId));
      customerId && (await customersApiService.delete(customerId));
      for (const pId of products) {
        pId && (await productsAPIService.delete(pId));
      }
    }
  );
});

test.describe('[API] [Orders] [Received Products] [Negative] [POST] Draft Status of the Order', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: ordersAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createDraftOrder();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should NOT mark product as received from DRAFT ORDER (Status "Draft")',
    {
      tag: [
        '@5ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.receiveProducts(
        orderId,
        products,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_ORDER_STATUS
      );
    }
  );

  test.afterAll(
    async ({
      ordersAPIService: ordersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      orderId && (await ordersAPIService.delete(orderId));
      customerId && (await customersApiService.delete(customerId));
      for (const pId of products) {
        pId && (await productsAPIService.delete(pId));
      }
    }
  );
});

test.describe('[API] [Orders] [Received Products] [Negative] [POST]', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ signInApiService, ordersAPIService: ordersAPIService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createInProsessOrder();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should NOT mark product as received with incorrect token',
    {
      tag: [
        '@6ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const invalidToken = simpleFaker.string.alphanumeric(195);
      const response = await ordersController.receiveProducts(
        orderId,
        products,
        invalidToken
      );
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    'Should NOT mark product as received with empty token',
    {
      tag: [
        '@7ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.receiveProducts(
        orderId,
        products,
        ''
      );
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  //ТЕСТ ПАДАЕТ потому что баг, а не потому, что тест плохой
  //Не править!!!
  test(
    'Should NOT mark product as received with invalid order ID',
    {
      tag: [
        '@8ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const invalidID = '67adf2639f31117d8c54c143';
      console.log(ERRORS.ORDER_NOT_FOUND(invalidID));
      const response = await ordersController.receiveProducts(
        invalidID,
        products,
        token
      );
      console.log(response.body.ErrorMessage);
      validateResponse(
        response,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.ORDER_NOT_FOUND(invalidID)
      );
    }
  );

  test(
    'Should NOT mark product as received with invalid product ID',
    {
      tag: [
        '@9ReceievedProducts_ORDER-API',
        '@alena-api',
        '@receive-order',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const invalidID = ['67bc32d67b4bcc1667131ccb'];
      const response = await ordersController.receiveProducts(
        orderId,
        invalidID,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.NOT_REQUESTED(invalidID[0])
      );
    }
  );

  test.afterAll(
    async ({
      ordersAPIService: ordersAPIService,
      productsAPIService,
      customersApiService
    }) => {
      orderId && (await ordersAPIService.delete(orderId));
      customerId && (await customersApiService.delete(customerId));
      for (const pId of products) {
        pId && (await productsAPIService.delete(pId));
      }
    }
  );
});
