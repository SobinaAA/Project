import { test } from 'fixtures/services.fixture';

test.describe('UI Smoke Customers tests', async function () {
  let id = '';

  test('Open Customers Page', async function ({
    signInPageService,
    homePageService,
    customersPageService,
    customersApiService
  }) {
    const customer = await customersApiService.create();
    id = customer._id;
    await signInPageService.openSalesPortal();
    // await signInPageService.loginAsAdmin();
    await homePageService.openCustomersPage();
    await customersPageService.validateCustomerInTable(customer);
  });
  test('Open Customer Details', async function ({
    signInPageService,
    homePageService,
    customersPageService,
    customersApiService,
    customerDetailsPageService
  }) {
    const customer = await customersApiService.create();
    id = customer._id;
    await signInPageService.openSalesPortal();
    // await signInPageService.loginAsAdmin();
    await homePageService.openCustomersPage();
    await customersPageService.openDetailsPage(customer.email);
    await customerDetailsPageService.validateCustomerData(customer);
  });
  test.afterEach(async function ({ customersApiService }) {
    if (id) {
      await customersApiService.delete(id);
      id = '';
    }
  });
});
