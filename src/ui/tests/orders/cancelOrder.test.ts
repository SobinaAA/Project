import { expect, test } from 'fixtures/services.fixture';
import { IProductFromResponse } from 'data/types/product.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IOrderFromResponse } from 'data/types/orders.types';
import { ORDER_STATUS } from 'data/orders/statuses';
import { generateDelivery } from 'utils/order/generateDelivery';

test.describe(`[UI] [Orders] [Positive] Cancel Draft Order`, async function () {
  let orderData: {
    order: IOrderFromResponse;
    customer: ICustomerFromResponse;
    product: IProductFromResponse;
  };
  let orderId = '';

  test.beforeAll(async ({ ordersAPIService }) => {
    orderData = await ordersAPIService.createRandomOrder();
    orderId = orderData.order._id;
  });

  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should cancel Order in Draft Status',
    { tag: ['@1OrdersCancel-UI', '@alena-order-cancel-UI'] },
    async function ({
      homePageService,
      ordersListPageService,
      orderDetailsPageService
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await orderDetailsPageService.cancelOrder();
      await orderDetailsPageService.validateCancelOrderNotification();
      await orderDetailsPageService.validateOrderStatus(ORDER_STATUS.CANCELLED);
    }
  );

  test.afterAll(
    async ({ ordersAPIService, customersApiService, productsAPIService }) => {
      orderId && (await ordersAPIService.delete(orderId));
      orderData && (await customersApiService.delete(orderData.customer._id));
      orderData && (await productsAPIService.delete(orderData.product._id));
    }
  );
});

test.describe(`[UI] [Orders] [Positive] Cancel In Process Order`, async function () {
  let orderData: {
    order: IOrderFromResponse;
    customer: ICustomerFromResponse;
    product: IProductFromResponse;
  };
  let orderId = '';
  let token = '';

  test.beforeAll(async ({ ordersAPIService, signInApiService }) => {
    orderData = await ordersAPIService.createRandomOrder();
    orderId = orderData.order._id;
    token = await signInApiService.getTransformedToken();
  });

  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should cancel Order In Process Status',
    { tag: ['@2OrdersCancel-UI', '@alena-order-cancel-UI'] },
    async function ({
      homePageService,
      ordersListPageService,
      orderDetailsPageService,
      ordersController
    }) {
      await homePageService.openOrdersPage();
      await ordersController.updateDelivery(
        orderData.order._id,
        generateDelivery(),
        token
      );

      await ordersController.updateStatus({
        id: orderData.order._id,
        status: ORDER_STATUS.IN_PROCESS,
        token
      });

      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await orderDetailsPageService.cancelOrder();
      await orderDetailsPageService.validateCancelOrderNotification();
      await orderDetailsPageService.validateOrderStatus(ORDER_STATUS.CANCELLED);
    }
  );

  test.afterAll(
    async ({ ordersAPIService, customersApiService, productsAPIService }) => {
      orderId && (await ordersAPIService.delete(orderId));
      orderData && (await customersApiService.delete(orderData.customer._id));
      orderData && (await productsAPIService.delete(orderData.product._id));
    }
  );
});

test.describe(`[UI] [Orders] [Negative] Cancel Recieved Order`, async function () {
  let orderData: {
    order: IOrderFromResponse;
    customer: ICustomerFromResponse;
    product: IProductFromResponse;
  };
  let orderId = '';
  let token = '';

  test.beforeAll(async ({ ordersAPIService, signInApiService }) => {
    orderData = await ordersAPIService.createRandomOrder();
    orderId = orderData.order._id;
    token = await signInApiService.getTransformedToken();
  });

  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should not cancel Order In Recieved Status',
    { tag: ['@3OrdersCancel-UI', '@alena-order-cancel-UI'] },
    async function ({
      homePageService,
      ordersListPageService,
      ordersDetailsPage,
      ordersController
    }) {
      await homePageService.openOrdersPage();
      await ordersController.updateDelivery(
        orderData.order._id,
        generateDelivery(),
        token
      );

      await ordersController.updateStatus({
        id: orderData.order._id,
        status: ORDER_STATUS.IN_PROCESS,
        token
      });

      await ordersController.receiveProducts(
        orderData.order._id,
        orderData.order.products.map((product) => product._id),
        token
      );
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      expect(ordersDetailsPage['Cancel Order Button']).toHaveCount(0);
    }
  );

  test.afterAll(
    async ({ ordersAPIService, customersApiService, productsAPIService }) => {
      orderId && (await ordersAPIService.delete(orderId));
      orderData && (await customersApiService.delete(orderData.customer._id));
      orderData && (await productsAPIService.delete(orderData.product._id));
    }
  );
});
