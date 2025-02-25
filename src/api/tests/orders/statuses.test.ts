import { expect, test } from 'fixtures/apiServices.fixture';
import { validateResponse } from 'utils/validation/apiValidation';
import { STATUS_CODES } from 'data/statusCodes';
import { ERRORS } from 'data/errorMesages';
import { TAGS } from 'data/tags';
import { simpleFaker } from '@faker-js/faker';
import { ORDER_STATUS } from 'data/orders/statuses';
import { ORDER_STATUSES } from 'data/types/orders.types';

test.describe('[API] [Orders] [Process Statuses] [Positive] [POST] Draft -> Canceled', async function () {
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(async ({ ordersAPIService: ordersAPIService }) => {
    const createdOrder = await ordersAPIService.createDraftOrder();
    orderId = createdOrder._id;
    customerId = createdOrder.customer._id;
    products = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Should cancel Draft Order',
    {
      tag: [
        '@1Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersAPIService }) => {
      const response = await ordersAPIService.updateStatus(
        orderId,
        ORDER_STATUS.CANCELLED
      );
      expect(response.status).toBe(ORDER_STATUS.CANCELLED);
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

test.describe('[API] [Orders] [Process Statuses] [Positive] [POST] Draft -> In Process', async function () {
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(async ({ ordersAPIService: ordersAPIService }) => {
    const createdOrder = await ordersAPIService.createDraftOrderWithDelivery();
    orderId = createdOrder._id;
    customerId = createdOrder.customer._id;
    products = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Should move Draft Order to In Process',
    {
      tag: [
        '@2Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersAPIService }) => {
      const response = await ordersAPIService.updateStatus(
        orderId,
        ORDER_STATUS.IN_PROCESS
      );
      expect(response.status).toBe(ORDER_STATUS.IN_PROCESS);
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

test.describe('[API] [Orders] [Process Statuses] [Positive] [POST] In Process -> Partially Received', async function () {
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(async ({ ordersAPIService: ordersAPIService }) => {
    const createdOrder = await ordersAPIService.createInProsessOrder(3);
    orderId = createdOrder._id;
    customerId = createdOrder.customer._id;
    products = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Should Partially Receive In Process Order',
    {
      tag: [
        '@3Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
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
      expect(response.body.Order.status).toBe(
        ORDER_STATUSES.PARTIALLY_RECEIVED
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
      await productsAPIService.delete(products[0]);
    }
  );
});

test.describe('[API] [Orders] [Process Statuses] [Positive] [POST] In Process -> Received', async function () {
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
    'Should Receive In Process Order',
    {
      tag: [
        '@4Process-ORDER-API',
        '@Process-orders',
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
      await productsAPIService.delete(products[0]);
    }
  );
});

test.describe('[API] [Orders] [Process Statuses] [Positive] [POST] In Process -> Canceled', async function () {
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
    'Should cancel In Proccess Order',
    {
      tag: [
        '@5Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersAPIService }) => {
      const response = await ordersAPIService.updateStatus(
        orderId,
        ORDER_STATUS.CANCELLED
      );
      expect(response.status).toBe(ORDER_STATUS.CANCELLED);
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

test.describe('[API] [Orders] [Process Statuses] [Negative] [POST] Draft without Delivery', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ ordersAPIService: ordersAPIService, signInApiService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createDraftOrder();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should not move Draft Order to In Process without Delivery',
    {
      tag: [
        '@6Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.IN_PROCESS,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.WITHOUT_DELIVERY
      );
    }
  );

  test(
    'Should not move Draft Order to Received',
    {
      tag: [
        '@7Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.RECEIVED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move Draft Order to Partially Received',
    {
      tag: [
        '@7Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.PARTIALLY_RECEIVED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
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

test.describe('[API] [Orders] [Process Statuses] [Negative] [POST] Draft with Delivery', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ ordersAPIService: ordersAPIService, signInApiService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder =
        await ordersAPIService.createDraftOrderWithDelivery();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should not move Draft Order with Delivery to Received',
    {
      tag: [
        '@8Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.RECEIVED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move Draft Order with Delivery to Partially Received',
    {
      tag: [
        '@9Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.PARTIALLY_RECEIVED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
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

test.describe('[API] [Orders] [Process Statuses] [Negative] [POST] In Process -> Received', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ ordersAPIService: ordersAPIService, signInApiService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createInProsessOrder();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should not move In Process order to Received',
    {
      tag: [
        '@10Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.RECEIVED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move In Process order to Partially Received',
    {
      tag: [
        '@11Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.PARTIALLY_RECEIVED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move In Process to Draft',
    {
      tag: [
        '@11Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.DRAFT,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
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

test.describe('[API] [Orders] [Process Statuses] [Negative] [POST] Received -> Canceled', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ ordersAPIService: ordersAPIService, signInApiService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder = await ordersAPIService.createOrderInReceivedStatus();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should not move Received to Canceled',
    {
      tag: [
        '@12Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.CANCELLED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move Received to Draft',
    {
      tag: [
        '@13Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.DRAFT,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move Received to In Process',
    {
      tag: [
        '@14Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.IN_PROCESS,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
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

test.describe('[API] [Orders] [Process Statuses] [Negative] [POST] Partially Received -> Canceled', async function () {
  let token: string;
  let orderId: string;
  let customerId: string;
  let products: string[];

  test.beforeAll(
    async ({ ordersAPIService: ordersAPIService, signInApiService }) => {
      token = await signInApiService.loginAsAdmin();
      const createdOrder =
        await ordersAPIService.createOrderInPartiallyReceivedStatus();
      orderId = createdOrder._id;
      customerId = createdOrder.customer._id;
      products = createdOrder.products.map((p) => p._id) as string[];
    }
  );

  test(
    'Should not move Partially Received to Canceled',
    {
      tag: [
        '@15Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.CANCELLED,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move Partially Received to Draft',
    {
      tag: [
        '@16Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.DRAFT,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
      );
    }
  );

  test(
    'Should not move Partially Received to In Process',
    {
      tag: [
        '@17Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.IN_PROCESS,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INVALID_STATUS
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
      await productsAPIService.delete(products[0]);
    }
  );
});

test.describe('[API] [Orders] [Process Statuses] [Positive] [POST] Tokens and incrorrect data', async function () {
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
    'Should not process order with empty token',
    {
      tag: [
        '@18Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.IN_PROCESS,
        token: ''
      });
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    'Should not process order with invalid token',
    {
      tag: [
        '@18Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const invalidToken = simpleFaker.string.alphanumeric(195);
      const response = await ordersController.updateStatus({
        id: orderId,
        status: ORDER_STATUS.IN_PROCESS,
        token: invalidToken
      });
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    'Should not process order with invalid status',
    {
      tag: [
        '@18Process-ORDER-API',
        '@Process-orders',
        '@alena-api',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async ({ ordersController }) => {
      const invalidStatus = simpleFaker.string.numeric(10);
      const response = await ordersController.updateStatus({
        id: orderId,
        status: invalidStatus as ORDER_STATUS,
        token
      });
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
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
