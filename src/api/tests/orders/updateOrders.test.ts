import { test } from 'fixtures/apiServices.fixture';
import { TAGS } from 'data/tags';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { oneOrderSchema } from 'data/jsonSchemas/order.schema';
import { STATUS_CODES } from 'data/statusCodes';
import { ERRORS } from '../../../data/errorMesages';
import { IOrderData } from '../../../data/types/orders.types';

test.describe('[API] [Orders] [PUT] [Positive]', async function () {
  let token: string;
  let orderId: string;
  let initialCustomerId: string;
  let initialProducts: string[];

  let newlyCreatedProducts: string[] = [];
  let newlyCreatedCustomers: string;

  test.beforeAll(async ({ signInApiService, odrersAPIService }) => {
    token = await signInApiService.loginAsAdmin();
    const createdOrder = await odrersAPIService.createDraftOrder();
    orderId = createdOrder._id;
    initialCustomerId = createdOrder.customer._id;
    initialProducts = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Update an order (possibly customer)',
    { tag: ['@1PUT_ORDER-API', '@tania-api', TAGS.REGRESSION, TAGS.SMOKE] },
    async ({ ordersController, customersApiService }) => {
      const newCustomer = await customersApiService.create();
      newlyCreatedCustomers = newCustomer._id;
      const updatedData = {
        customer: newCustomer._id,
        products: initialProducts
      };
      const updateResponse = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(updateResponse, STATUS_CODES.OK, true, null);
      validateJsonSchema(oneOrderSchema, updateResponse);
    }
  );

  test(
    'Update an order with multiple products',
    { tag: ['@2PUT_ORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController, productsAPIService }) => {
      const [product1, product2, product3] = await Promise.all([
        productsAPIService.create(),
        productsAPIService.create(),
        productsAPIService.create()
      ]);
      newlyCreatedProducts.push(product1._id, product2._id, product3._id);
      const updatedData = {
        customer: initialCustomerId,
        products: [product1._id, product2._id, product3._id]
      };
      const updateResponse = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(updateResponse, STATUS_CODES.OK, true, null);
      validateJsonSchema(oneOrderSchema, updateResponse);
    }
  );

  test(
    'Update an order with duplicate products',
    { tag: ['@3PUT_ORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController, productsAPIService }) => {
      const product = await productsAPIService.create();
      newlyCreatedProducts.push(product._id);
      const updatedData = {
        customer: initialCustomerId,
        products: [product._id, product._id, product._id]
      };
      const updateResponse = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(updateResponse, STATUS_CODES.OK, true, null);
      validateJsonSchema(oneOrderSchema, updateResponse);
    }
  );

  test('Update an order by removing a product', async ({
    ordersController,
    productsAPIService
  }) => {
    const [product1, product2] = await Promise.all([
      productsAPIService.create(),
      productsAPIService.create()
    ]);
    newlyCreatedProducts.push(product1._id, product2._id);

    let updatedData: IOrderData = {
      customer: initialCustomerId,
      products: [product1._id, product2._id]
    };
    let updateResponse = await ordersController.updateOrder(
      orderId,
      updatedData,
      token
    );
    validateResponse(updateResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneOrderSchema, updateResponse);

    updatedData = {
      customer: initialCustomerId,
      products: [product1._id]
    };
    updateResponse = await ordersController.updateOrder(
      orderId,
      updatedData,
      token
    );
    validateResponse(updateResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneOrderSchema, updateResponse);
  });

  test.afterAll(
    async ({ odrersAPIService, customersApiService, productsAPIService }) => {
        orderId && await odrersAPIService.delete(orderId);
        initialCustomerId && await customersApiService.delete(initialCustomerId);
        newlyCreatedCustomers && await customersApiService.delete(newlyCreatedCustomers);
      for (const pId of initialProducts) {
        pId && (await productsAPIService.delete(pId));
      }
      for (const pId of newlyCreatedProducts) {
        pId && (await productsAPIService.delete(pId));
      }
      orderId = initialCustomerId = newlyCreatedCustomers = '';
      initialProducts =  newlyCreatedProducts = [];
    }
  );
});

test.describe('[API] [Orders] [PUT] [Negative]', async function () {
  let token: string;
  let orderId: string;
  let initialCustomerId: string;
  let initialProductsId: string[];

  test.beforeAll(async ({ signInApiService, odrersAPIService }) => {
    token = await signInApiService.loginAsAdmin();
    const createdOrder = await odrersAPIService.createDraftOrder(1);
    orderId = createdOrder._id;
    initialCustomerId = createdOrder.customer._id;
    initialProductsId = createdOrder.products.map((p) => p._id) as string[];
  });

  test(
    'Should not update order when customer field is missing',
    { tag: ['@5PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        products: initialProductsId
      } as IOrderData;
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Should not update order when products field is missing',
    { tag: ['@6PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        customer: initialCustomerId
      } as IOrderData;
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Should not update order when products array is empty',
    { tag: ['@7PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        customer: initialCustomerId,
        products: []
      };
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Should not update order when customer field is not a string',
    { tag: ['@8PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        customer: 12345,
        products: initialProductsId
      } as unknown as IOrderData;
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Should not update order when products array contains non-string values',
    { tag: ['@9PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        customer: initialCustomerId,
        products: [12345, 67890]
      } as unknown as IOrderData;
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
        token
      );
      validateResponse(
        response,
        STATUS_CODES.INVALID_REQUEST,
        false,
        ERRORS.INCORRECT_REQUEST_BODY
      );
    }
  );

  test(
    'Should not update order with missing authorization token',
    { tag: ['@10PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        customer: initialCustomerId,
        products: initialProductsId
      };
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
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

  test(
    'Should not update order with invalid authorization token',
    { tag: ['@11PUTORDER-API', '@tania-api', TAGS.REGRESSION] },
    async ({ ordersController }) => {
      const updatedData = {
        customer: initialCustomerId,
        products: initialProductsId
      };
      const response = await ordersController.updateOrder(
        orderId,
        updatedData,
        'invalid_token'
      );
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test.afterAll(
    async ({ odrersAPIService, customersApiService, productsAPIService }) => {
      orderId && (await odrersAPIService.delete(orderId));
      initialCustomerId &&
        (await customersApiService.delete(initialCustomerId));
      for (const pId of initialProductsId) {
        pId && (await productsAPIService.delete(pId));
      }
    }
  );
});
