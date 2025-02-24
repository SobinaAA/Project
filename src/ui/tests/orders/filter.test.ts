import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { ORDER_STATUS } from 'data/orders/statuses';

test.describe(`[UI] [Orders] Filter rhe list of orders by Status`, async function () {
  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    // await signInPageService.loginAsAdmin();
    await homePageService.openOrdersPage();
  });
  for (const iter in ORDER_STATUS) {
    const status = ORDER_STATUS[iter];
    const tag = `@${iter}OrdersFilter-UI`;
    test(
      `Should filter the table with ${status}`,
      {
        tag: [
          tag,
          '@alena-orders-UI',
          '@orders-filter',
          TAGS.REGRESSION,
          TAGS.SMOKE
        ]
      },
      async function ({ ordersListPageService }) {
        await ordersListPageService.filterOrdersByStatus(status);
        await ordersListPageService.checkFilterByStatus(status);
      }
    );
  }
});
