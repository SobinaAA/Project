import { CustomersController } from "../api/controllers/customers.controller";
import { ProductsController } from "../api/controllers/products.controller";
import { SignInController } from "../api/controllers/signIn.controller";
import { test as base } from "@playwright/test";

interface ISalesPortalApiControllers {
  signInController: SignInController;
  customersController: CustomersController;
  productsAPIController: ProductsController
}

export const test = base.extend<ISalesPortalApiControllers>({
  signInController: async ({}, use) => {
    await use(new SignInController());
  },

  customersController: async ({}, use) => {
    await use(new CustomersController());
  },

  productsAPIController: async ({}, use) => {
    await use(new ProductsController());
  },
});

export { expect } from "@playwright/test";
