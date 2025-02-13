import { CustomersAPIController } from 'api/controllers/customers.controller';
import { ProductsController } from 'api/controllers/products.controller';
import { SignInController } from 'api/controllers/signIn.controller';
import { test as base } from '@playwright/test';
import { OrdersAPIController } from 'api/controllers/orders.controller';

interface ISalesPortalApiControllers {
  signInController: SignInController;
  customersAPIController: CustomersAPIController;
  productsAPIController: ProductsController;
  ordersController: OrdersAPIController;
}

export const test = base.extend<ISalesPortalApiControllers>({
  signInController: async ({}, use) => {
    await use(new SignInController());
  },

  customersAPIController: async ({}, use) => {
    await use(new CustomersAPIController());
  },

  productsAPIController: async ({}, use) => {
    await use(new ProductsController());
  },

  ordersController: async ({}, use) => {
    await use(new OrdersAPIController());
  }
});

export { expect } from '@playwright/test';
