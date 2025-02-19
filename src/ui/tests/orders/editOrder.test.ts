import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { IOrderFromResponse } from 'data/types/orders.types';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { IProductFromResponse } from 'data/types/product.types';
import { expect } from '@playwright/test';

test.describe(`[UI] [Orders] Update tests`, async function () {
  let orderData: {
    order: IOrderFromResponse;
    customer: ICustomerFromResponse;
    product: IProductFromResponse;
  };
  let orderId = '';
  let newCustomer: ICustomerFromResponse;
  let newCustomerName = '';
  let newProduct: IProductFromResponse
  let newProductName = '';

  test.beforeEach(async ({ ordersListPageService, signInPageService, homePageService, ordersAPIService }) => {
    orderData = await ordersAPIService.createRandomOrder();
    orderId = orderData.order._id;

    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openOrdersPage();
    await ordersListPageService.openDetailsOrder(orderId)
  });

  test.afterEach(async ({
                          ordersAPIService,
                          customersApiService,
                          productsAPIService
                        }) => {
    orderId && await ordersAPIService.delete(orderId);
    orderData && await customersApiService.delete(orderData.customer._id);
    orderData && await productsAPIService.delete(orderData.product._id);
    newProduct && await productsAPIService.delete(newProduct._id);
    newCustomer && await customersApiService.delete(newCustomer._id);
  });

  test(
    'Replace Customer in Order test',
    { tag: ['@UpdateOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ orderDetailsPageService, customersApiService }) {
      newCustomer = await customersApiService.create();
      newCustomerName = newCustomer.name;
      await orderDetailsPageService.updateOrderCustomer(newCustomerName);
      await orderDetailsPageService.validateUpdateNotification();
      const updatedCustomerName = await orderDetailsPageService.getCustomerName();
      expect(updatedCustomerName).toBe(newCustomerName);
    }
  );

  test(
    'Add New Product from Order test',
    { tag: ['@UpdateOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ orderDetailsPageService, productsAPIService }) {
      newProduct = await productsAPIService.create()
      newProductName = newProduct.name;
      await orderDetailsPageService.addNewProductOrder(newProductName);
      await orderDetailsPageService.validateUpdateNotification();
      await orderDetailsPageService.verifyLastProductMatches(newProductName)
    }
  );

  test(
    'Update Product from Order test',
    { tag: ['@UpdateOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ orderDetailsPageService, productsAPIService }) {
      newProduct = await productsAPIService.create()
      newProductName = newProduct.name;
      await orderDetailsPageService.updateProductOrder(newProductName);
      await orderDetailsPageService.validateUpdateNotification();
      await orderDetailsPageService.verifyLastProductMatches(newProductName)
    }
  );

  test(
    'Delete Product from Order test',
    { tag: ['@UpdateOrder', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ orderDetailsPageService, productsAPIService }) {
      newProduct = await productsAPIService.create()
      newProductName = newProduct.name;
      await orderDetailsPageService.addNewProductOrder(newProductName);
      await orderDetailsPageService.deleteOrderProduct(newProductName);
      await orderDetailsPageService.validateUpdateNotification();
    }
  );
});

