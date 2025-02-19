import { test as base } from 'fixtures/mock.fixture';
import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page';
import { DetailsCustomerPage } from 'ui/pages/customers/customerDetails.page';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { HomePage } from 'ui/pages/home.page';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { OrdersListPage } from 'ui/pages/orders/orders.page';
import { SheduleDeluveryPage } from 'ui/pages/orders/ScheduleDelivery.page';
import { ProductsListPage } from 'ui/pages/products/products.page';
import { SignInPage } from 'ui/pages/signIn.page';

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  customersPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;
  detailsCustomerPage: DetailsCustomerPage;
  editCustomerPage: EditCustomerPage;
  ordersPage: OrdersListPage;
  ordersDetailsPage: OrdersDetailsPage;
  sheduleDeliveryPage: SheduleDeluveryPage;
  productsListPage: ProductsListPage;
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
  detailsCustomerPage: async ({ page }, use) => {
    const detailsCustomerPage = new DetailsCustomerPage(page);
    await use(detailsCustomerPage);
  },
  editCustomerPage: async ({ page }, use) => {
    const editCustomerPage = new EditCustomerPage(page);
    await use(editCustomerPage);
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
  },

  productsListPage: async ({ page }, use) => {
    const productsListPage = new ProductsListPage(page);
    await use(productsListPage);
  }
});

export { expect } from '@playwright/test';
