import { test as base } from 'fixtures/apiContollers.fixture';
import { CustomersApiService } from 'api/services/customersApi.service';
import { SignInApiService } from 'api/services/signInApi.service';
import { ProductsApiService } from 'api/services/productApi.service';
import { OrdersApiService } from 'api/services/ordersApi.service';

interface ISalesPortalApiServices {
  signInApiService: SignInApiService;
  customersApiService: CustomersApiService;
  productsAPIService: ProductsApiService;
  ordersAPIService: OrdersApiService;
}

export const test = base.extend<ISalesPortalApiServices>({
  signInApiService: async ({ page }, use) => {
    await use(new SignInApiService(page));
  },

  customersApiService: async ({ page }, use) => {
    await use(new CustomersApiService(page));
  },

  productsAPIService: async ({ page }, use) => {
    await use(new ProductsApiService(page));
  },

  ordersAPIService: async ({ page }, use) => {
    await use(new OrdersApiService(page));
  }
});

export { expect } from '@playwright/test';
