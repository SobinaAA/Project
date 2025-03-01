import { test } from 'fixtures/services.fixture';
import { ICustomer } from 'data/types/customers.types';
import { TAGS } from 'data/tags';
import { NOTIFICATIONS } from 'data/notifications';
import { generateNewCustomer } from 'data/customers/generateCustomer';

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

test.describe(`[UI] [Customers] Customers Smoke tests`, async function () {
  let customer: ICustomer;
  let customerEmail = '';
  let customerAPIEmail = '';

  test.beforeEach(
    async ({ signInPageService, homePageService, customersApiService }) => {
      customer = await customersApiService.create();
      customerAPIEmail = customer.email;
      await signInPageService.openSalesPortal();
      await homePageService.openCustomersPage();
    }
  );

  test(
    'Add New Customer Smoke test',
    { tag: ['@1Customer-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ addNewCustomerPageService, customersPageService }) {
      await customersPageService.openAddNewCustomerPage();
      const createdCustomer = await addNewCustomerPageService.create();
      customerEmail = createdCustomer.email;
      await customersPageService.validateNotification(
        NOTIFICATIONS.CUSTOMER_CREATED
      );
      await customersPageService.checkCustomerInTable(createdCustomer);
    }
  );

  test(
    'Delete Customer Smoke test',
    { tag: ['@2Customer-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ customersPageService }) {
      await customersPageService.deleteCustomer(customerAPIEmail);
      await customersPageService.waitForAndValidateNotification(
        NOTIFICATIONS.CUSTOMER_DELETED
      );
    }
  );

  test(
    'Edit Customer Smoke test',
    { tag: ['@3Customer-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ customersPageService, editCustomerPageService }) {
      const updatedCustomer = generateNewCustomer();
      customerEmail = updatedCustomer.email;
      await editCustomerPageService.updateCustomer(
        customer.email,
        updatedCustomer
      );
      await customersPageService.checkCustomerInTable(updatedCustomer);
      await customersPageService.waitForAndValidateNotification(
        NOTIFICATIONS.CUSTOMER_EDIT_SUCCESS
      );
    }
  );

  test.afterEach(async ({ customersApiService }) => {
    customerAPIEmail &&
      (await customersApiService.deleteByEmail(customerAPIEmail));
    customerEmail && (await customersApiService.deleteByEmail(customerEmail));
  });
});
