import { expect, test } from 'fixtures/services.fixture';
import { IProductFromResponse } from 'data/types/product.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IOrderFromResponse } from 'data/types/orders.types';
import { TAGS } from 'data/tags';
import { simpleFaker } from '@faker-js/faker';
import { EMPTY_TABLE_MESSAGE } from 'data/table.data';

test.describe(`[UI] [Orders] [Positive] Search Orders by Name, Number, Email, Price, Status`, async function () {
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
  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    // await signInPageService.loginAsAdmin();
    await homePageService.openOrdersPage();
  });

  test(
    `Should find my Order by Order Number`,
    {
      tag: [
        '@1OrdersSearch-UI',
        '@alena-orders-UI',
        '@orders-search',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async function ({ ordersListPageService }) {
      await ordersListPageService.searchWithInput(orderData.order._id);
      await ordersListPageService.checkSearch(orderData.order._id);
    }
  );

  test(
    `Should find my Order by Customer Email`,
    {
      tag: [
        '@2OrdersSearch-UI',
        '@alena-orders-UI',
        '@orders-search',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async function ({ ordersListPageService }) {
      await ordersListPageService.searchWithInput(orderData.customer.email);
      await ordersListPageService.checkSearch(orderData.customer.email);
    }
  );

  test(
    `Should find my Order by Order Status`,
    {
      tag: [
        '@3OrdersSearch-UI',
        '@alena-orders-UI',
        '@orders-search',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async function ({ ordersListPageService }) {
      await ordersListPageService.searchWithInput(orderData.order.status);
      await ordersListPageService.checkSearch(orderData.order.status);
    }
  );

  test(
    `Should find my Order by Total Price`,
    {
      tag: [
        '@4OrdersSearch-UI',
        '@alena-orders-UI',
        '@orders-search',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async function ({ ordersListPageService }) {
      await ordersListPageService.searchWithInput(
        orderData.order.total_price + ''
      );
      await ordersListPageService.checkSearch(orderData.order.total_price + '');
    }
  );

  test(
    `Should find my Order by Customer Name`,
    {
      tag: [
        '@5OrdersSearch-UI',
        '@alena-orders-UI',
        '@orders-search',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async function ({ ordersListPageService }) {
      await ordersListPageService.searchWithInput(orderData.customer.name);
      await ordersListPageService.checkSearch(orderData.customer.name);
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

test.describe(`[UI] [Orders] [Negative] Search Orders`, async function () {
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
  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    // await signInPageService.loginAsAdmin();
    await homePageService.openOrdersPage();
  });

  test(
    `Should NOT find my Order by strict search string`,
    {
      tag: [
        '@6OrdersSearch-UI',
        '@alena-orders-UI',
        '@orders-search',
        TAGS.REGRESSION,
        TAGS.SMOKE
      ]
    },
    async function ({ ordersListPageService, ordersPage }) {
      const strongSearchString = simpleFaker.string.alphanumeric(15);
      await ordersListPageService.searchWithInput(strongSearchString);
      const actual = await ordersPage['Empty Table'].innerText();
      expect(actual).toContain(EMPTY_TABLE_MESSAGE);
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
