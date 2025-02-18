import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';

test.describe(`[UI] [Orders] Component tests of Orders block (UI check, screenshots)`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should see the Customers block highlighted in the side menu',
    { tag: ['@1OrderCom-UI', '@alena-UI-orders', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, ordersListPageService }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.checkLeftMenuOption('Orders');
    }
  );
});
