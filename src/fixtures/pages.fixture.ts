import { test as base } from 'fixtures/mock.fixture';
import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page';
import { CustomerDetailsPage } from 'ui/pages/customers/customerDetails.page';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { HomePage } from 'ui/pages/home.page';
import { SignInPage } from 'ui/pages/signIn.page';

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  customersPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;
  customerDetailsPage: CustomerDetailsPage;
  editCustomerPage: EditCustomerPage;
}

export const test = base.extend<ISalesPortalPages>({
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  customersPage: async ({ page }, use) => {
    const customersPage = new CustomersListPage(page);
    await use(customersPage);
  },
  addNewCustomerPage: async ({ page }, use) => {
    const addNewCustomerPage = new AddNewCustomerPage(page);
    await use(addNewCustomerPage);
  },
  customerDetailsPage: async ({ page }, use) => {
    const customerDetailsPage = new CustomerDetailsPage(page);
    await use(customerDetailsPage);
  },
  editCustomerPage: async ({ page }, use) => {
    const editCustomerPage = new EditCustomerPage(page);
    await use(editCustomerPage);
  }
});

export { expect } from '@playwright/test';
