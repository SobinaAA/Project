//import { customersPageMock } from 'data/mock/customers.mock';
import { test } from '../../../fixtures/services.fixture';
import { TAGS } from 'data/tags';

test.describe(`[UI] [Customers] Component tests of Customers block (UI check, screenshots)`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should see the Customers block highlighted in the side menu',
    { tag: ['@1CustCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, customersPageService }) {
      await homePageService.openCustomersPage();
      await customersPageService.checkLeftMenuOption('Customers');
    }
  );

  //   const mockData = structuredClone(customersPageMock);
  //     await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Customers, mockData, STATUS_CODES.OK);
  //     await signInPageService.openSalesPortal();
  //     await homePageService.openCustomersPage();
});
