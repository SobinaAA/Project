import { test } from 'fixtures/services.fixture';
import { IOrderFromResponse } from 'data/types/orders.types';
import { TAGS } from 'data/tags';

test.describe(`[UI] [Orders] Delivery tests`, async function () {
  let currentOrder: IOrderFromResponse;
  let orderId = '';

  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test.afterEach(
    async ({ ordersAPIService, customersApiService, productsAPIService }) => {
      orderId && (await ordersAPIService.delete(orderId));
      currentOrder &&
        (await customersApiService.delete(currentOrder.customer._id));
      if (
        currentOrder &&
        currentOrder.products &&
        currentOrder.products.length > 0
      ) {
        for (const product of currentOrder.products) {
          await productsAPIService.delete(product._id);
        }
      }
    }
  );

  test(
    'Add Delivery Test',
    { tag: ['@SmokeDeliveryOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      scheduleDeliveryService,
      orderDetailsPageService,
      ordersAPIService,
      ordersListPageService,
      homePageService
    }) {
      const orderData = await ordersAPIService.createRandomOrder();
      currentOrder = orderData.order;
      orderId = currentOrder._id;
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderId);
      await orderDetailsPageService.openScheduleDelivery();
      await scheduleDeliveryService.createDelivery();
      await orderDetailsPageService.validateDeliveryWasSuccessfullyNotification();
      await orderDetailsPageService.verifyDeliveryInHistory('created');
    }
  );

  test(
    'Delivery Update test',
    { tag: ['@SmokeUpdateOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      scheduleDeliveryService,
      orderDetailsPageService,
      ordersAPIService,
      ordersListPageService,
      homePageService
    }) {
      currentOrder = await ordersAPIService.createDraftOrderWithDelivery();
      orderId = currentOrder._id;
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderId);
      await orderDetailsPageService.openScheduleDelivery();
      await scheduleDeliveryService.updateDelivery();
      await orderDetailsPageService.validateDeliveryWasSuccessfullyNotification();
      await orderDetailsPageService.verifyDeliveryInHistory('changed');
    }
  );
});
