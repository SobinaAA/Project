//import { customersPageMock } from 'data/mock/customers.mock';
import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { customersMyPageMock, oneCustomerMock } from 'data/mock/customers.mock';
import { STATUS_CODES } from 'data/statusCodes';

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

  test(
    'Should see a correct UI for customers list with mock data',
    { tag: ['@2CustCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, mock, customersPageService }) {
      const mockData = structuredClone(customersMyPageMock);
      await mock.modifyReponse(
        /\/api\/customers\?.*/,
        mockData,
        STATUS_CODES.OK
      );
      await homePageService.openCustomersPage();
      await customersPageService.checkFilterContent();
      await customersPageService.checkMainContent();
    }
  );

  test(
    'Should see a correct UI for modal window (asking for confirmation to delete customer)',
    { tag: ['@3CustCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, customersPageService }) {
      await homePageService.openCustomersPage();
      await customersPageService.checkUIModalDelete();
    }
  );

  test(
    'Should see a correct UI for add new customer page',
    { tag: ['@4CustCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, customersPageService }) {
      await homePageService.openCustomersPage();
      await customersPageService.openAddNewCustomerPage();
      await customersPageService.checkUIAddNewCustomerPage();
    }
  );

  test(
    'Should see a correct UI for edit customer page with mock data',
    { tag: ['@5CustCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, customersPageService, mock }) {
      const mockData = structuredClone(oneCustomerMock);
      await homePageService.openCustomersPage();
      await mock.modifyReponse(
        /\/api\/customers\/[a-f0-9]{24}\//,
        mockData,
        STATUS_CODES.OK
      );
      await customersPageService.openEditRandomCustomer();
      await customersPageService.checkEditCustomerPage();
    }
  );

  test(
    'Should see a correct UI for details customer page with mock data',
    { tag: ['@6CustCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, customersPageService, mock }) {
      const mockData = structuredClone(oneCustomerMock);
      await homePageService.openCustomersPage();
      await mock.modifyReponse(
        /\/api\/customers\/[a-f0-9]{24}\//,
        mockData,
        STATUS_CODES.OK
      );
      await customersPageService.openDetailsRandomCustomer();
      await customersPageService.checkDetailsCustomerPage();
    }
  );
});
