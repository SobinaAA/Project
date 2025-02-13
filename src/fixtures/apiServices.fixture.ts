import { test as base } from 'fixtures/apiContollers.fixture';
import { CustomersApiService } from 'api/services/customersApi.service';
import { SignInApiService } from 'api/services/signInApi.service';
import { CustomersAPIController } from 'api/controllers/customers.controller';
import { ProductsController } from 'api/controllers/products.controller';
import { ProductsApiService } from 'api/services/productApi.service';
import { OrdersApiService } from 'api/services/ordersApi.service';
import { OrdersAPIController } from 'api/controllers/orders.controller';

interface ISalesPortalApiServices {
  signInApiService: SignInApiService;
  customersApiService: CustomersApiService;
  productsAPIService: ProductsApiService;
  odrersAPIService: OrdersApiService;
}

const signInApiService = new SignInApiService();

export const test = base.extend<ISalesPortalApiServices>({
  signInApiService: async ({}, use) => {
    await use(signInApiService);
  },

  customersApiService: async ({}, use) => {
    await use(
      new CustomersApiService(new CustomersAPIController(), signInApiService)
    );
  },

  productsAPIService: async ({}, use) => {
    await use(
      new ProductsApiService(new ProductsController(), signInApiService)
    );
  },

  odrersAPIService: async ({}, use) => {
    await use(
      new OrdersApiService(new OrdersAPIController(), signInApiService)
    );
  }
});

export { expect } from '@playwright/test';
