import { expect, test } from 'fixtures/services.fixture';
import { IProductFromResponse } from 'data/types/product.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IOrderFromResponse } from 'data/types/orders.types';
import { createCommentPositiveUI } from 'data/orders/testData/comments.data';
import { TAGS } from 'data/tags';
import { faker } from '@faker-js/faker';

test.describe(`[UI] [Orders] [Positive] Create Comments`, async function () {
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
  for (const { testName, tags, text } of createCommentPositiveUI) {
    test(
      testName,
      { tag: [...tags] },
      async function ({
        orderDetailsPageService,
        homePageService,
        ordersListPageService,
        ordersDetailsPage
      }) {
        await homePageService.openOrdersPage();
        await ordersListPageService.openDetailsOrder(orderData.customer.name);
        await ordersDetailsPage.openCommentsTab();
        await orderDetailsPageService.makeComment(text);
        await orderDetailsPageService.validateAddCommentNotification();
        await orderDetailsPageService.checkCommentPresence(text);
      }
    );
  }

  test.afterAll(
    async ({ ordersAPIService, customersApiService, productsAPIService }) => {
      orderId && (await ordersAPIService.delete(orderId));
      orderData && (await customersApiService.delete(orderData.customer._id));
      orderData && (await productsAPIService.delete(orderData.product._id));
    }
  );
});

test.describe(`[UI] [Orders] [Negative] Create Comments`, async function () {
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
    'Should not create comment with large text (251 symbol)',
    {
      tag: [
        '@1OrdersNegative-UI',
        '@alena-negative-order-comments-UI',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({
      orderDetailsPageService,
      homePageService,
      ordersListPageService,
      ordersDetailsPage
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await ordersDetailsPage.openCommentsTab();
      const text = faker.string.alphanumeric({ length: 251 });
      await ordersDetailsPage.fillCommentInput(text);
      await orderDetailsPageService.checkErrorForComment();
    }
  );

  test(
    'Should not create comment with only space',
    {
      tag: [
        '@2OrdersNegative-UI',
        '@alena-negative-order-comments-UI',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({
      orderDetailsPageService,
      homePageService,
      ordersListPageService,
      ordersDetailsPage
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await ordersDetailsPage.openCommentsTab();
      const text = ' ';
      await ordersDetailsPage.fillCommentInput(text);
      await orderDetailsPageService.checkErrorForComment();
    }
  );

  test(
    'Should not create comment with "<"',
    {
      tag: [
        '@3OrdersNegative-UI',
        '@alena-negative-order-comments-UI',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({
      orderDetailsPageService,
      homePageService,
      ordersListPageService,
      ordersDetailsPage
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await ordersDetailsPage.openCommentsTab();
      const text =
        faker.string.alphanumeric({ length: { min: 10, max: 50 } }) +
        '<' +
        faker.string.alphanumeric({ length: { min: 10, max: 50 } });
      await ordersDetailsPage.fillCommentInput(text);
      await orderDetailsPageService.checkErrorForComment();
    }
  );

  test(
    'Should not create comment with ">"',
    {
      tag: [
        '@4OrdersNegative-UI',
        '@alena-negative-order-comments-UI',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({
      orderDetailsPageService,
      homePageService,
      ordersListPageService,
      ordersDetailsPage
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await ordersDetailsPage.openCommentsTab();
      const text =
        faker.string.alphanumeric({ length: { min: 10, max: 50 } }) +
        '>' +
        faker.string.alphanumeric({ length: { min: 10, max: 50 } });
      await ordersDetailsPage.fillCommentInput(text);
      await orderDetailsPageService.checkErrorForComment();
    }
  );

  test(
    'Should not create empty comment',
    {
      tag: [
        '@5OrdersNegative-UI',
        '@alena-negative-order-comments-UI',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({
      homePageService,
      ordersListPageService,
      ordersDetailsPage
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await ordersDetailsPage.openCommentsTab();
      expect(ordersDetailsPage['Create Comment Button']).toBeDisabled();
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

test.describe(`[UI] [Orders] [Positive] Delete Comments`, async function () {
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
    'Should delete comment',
    {
      tag: [
        '@1OrdersDeleteComment-UI',
        '@alena-order-delete-comments-UI',
        TAGS.SMOKE,
        TAGS.REGRESSION
      ]
    },
    async function ({
      orderDetailsPageService,
      homePageService,
      ordersListPageService,
      ordersDetailsPage
    }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.openDetailsOrder(orderData.customer.name);
      await ordersDetailsPage.openCommentsTab();
      const text = faker.string.alphanumeric({ length: { min: 10, max: 50 } });
      await orderDetailsPageService.makeComment(text);
      await orderDetailsPageService.validateAddCommentNotification();
      await orderDetailsPageService.checkCommentPresence(text);
      await orderDetailsPageService.deleteCommentByText(text);
      await orderDetailsPageService.validateDeleteCommentNotification();
      await orderDetailsPageService.checkCommentAbsence();
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
