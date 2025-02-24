import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { direction, sortMethodOrders } from 'data/types/sorting.types';

test.describe(`[UI] [Orders] Sorting the list of orders`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    // await signInPageService.loginAsAdmin();
  });

  let i = 1;
  for (const keyField of [
    'Order Number',
    'Name',
    'Email',
    'Price',
    'Delivery',
    'Status',
    'Created On'
  ]) {
    for (const order of ['asc', 'desc']) {
      const tag = `@${i}Orders-Sort-UI`;
      i++;
      test(
        `Should get list of orders sorted by ${keyField} - ${order} order`,
        {
          tag: [
            tag,
            '@alena-orders-UI',
            '@orders-sorting',
            TAGS.REGRESSION,
            TAGS.SMOKE
          ]
        },
        async function ({ ordersListPageService, homePageService }) {
          await homePageService.openOrdersPage();
          await ordersListPageService.sortBy(
            keyField as sortMethodOrders,
            order as direction
          );
          await ordersListPageService.checkSorting(
            keyField as sortMethodOrders,
            order as direction
          );
        }
      );
    }
  }
});
