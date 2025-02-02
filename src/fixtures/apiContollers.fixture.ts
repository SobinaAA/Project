import { CustomersAPIController } from 'api/controllers/customers.controller';
import { ProductsController } from 'api/controllers/products.controller';
import { SignInController } from 'api/controllers/signIn.controller';
import { test as base } from '@playwright/test';

interface ISalesPortalApiControllers {
  signInController: SignInController;
  customersAPIController: CustomersAPIController;
  productsAPIController: ProductsController;
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
  }
});

export { expect } from '@playwright/test';
