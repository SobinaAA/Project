import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { NOTIFICATIONS } from 'data/notifications';

test.describe(`[UI] [Orders] Orders Smoke tests`, async function () {
  let customerId = '';
  let customerName = '';
  let productId1 = '';
  let productName1 = '';
  let orderId = '';

  test.beforeEach(async ({
                           signInPageService,
                           homePageService,
                           customersApiService,
                           productsAPIService
                         }) => {
    const createdCustomer = await customersApiService.create();
    customerId = createdCustomer._id;
    customerName = createdCustomer.name;

    const createdProduct = await productsAPIService.create();
    productId1 = createdProduct._id;
    productName1 = createdProduct.name;

    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openOrdersPage();
  });

  test.afterEach(async ({
                          customersApiService,
                          ordersAPIService,
                          productsAPIService
                        }) => {
    orderId && await ordersAPIService.delete(orderId);
    customerId && await customersApiService.delete(customerId);
    productId1 && await productsAPIService.delete(productId1);

  });

  test(
    'Create Order Smoke test with 2 products',
    { tag: ['@1CreateOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ ordersListPageService }) {
      const order = {
        customer: customerName,
        products: [productName1]
      };
      await ordersListPageService.createOrder(order);
      await ordersListPageService.validateNotification(NOTIFICATIONS.ORDER_CREATED);
      orderId = await ordersListPageService.getOrderId(customerName)
      await ordersListPageService.checkOrderInTable(order);
    }
  );
});
