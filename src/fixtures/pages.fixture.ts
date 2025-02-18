import { test as base } from 'fixtures/mock.fixture';
import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { HomePage } from 'ui/pages/home.page';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { OrdersListPage } from 'ui/pages/orders/orders.page';
import { SheduleDeluveryPage } from 'ui/pages/orders/ScheduleDelivery.page';
import { SignInPage } from 'ui/pages/signIn.page';

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  customersPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;
  ordersPage: OrdersListPage;
  ordersDetailsPage: OrdersDetailsPage;
  sheduleDeliveryPage: SheduleDeluveryPage;
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
  ordersPage: async ({ page }, use) => {
    const ordersPage = new OrdersListPage(page);
    await use(ordersPage);
  },
  ordersDetailsPage: async ({ page }, use) => {
    const ordersDetailsPage = new OrdersDetailsPage(page);
    await use(ordersDetailsPage);
  },
  sheduleDeliveryPage: async ({ page }, use) => {
    const sheduleDeliveryPage = new SheduleDeluveryPage(page);
    await use(sheduleDeliveryPage);
  }
});

export { expect } from '@playwright/test';
