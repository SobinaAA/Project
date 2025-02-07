import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
// import { productMock } from 'data/mock/products.mock';
// import { STATUS_CODES } from 'data/statusCodes';

test.describe(`[UI] [Products] Component tests of Products block (UI check, screenshots)`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should see the Products block highlighted in the side menu',
    { tag: ['@ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService }) {
      await homePageService.openProductsPage();
      await homePageService.checkLeftMenuIllumination('Products');
    }
  );
});
