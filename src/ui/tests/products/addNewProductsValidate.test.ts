import { test } from 'fixtures/services.fixture';
import { NOTIFICATIONS } from 'data/notifications';
import { IProduct } from 'data/types/product.types';
import {
  productUITestDataPositive,
  productUITestDataNegative
} from 'data/products/testProductsData/addNewProductUI.data';

test.describe('[UI] [Products] Positive Create Validation Tests', async function () {
  let productName = '';

  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  productUITestDataPositive.forEach(({ testName, tags, data }) => {
    test(
      testName,
      { tag: [...tags] },
      async function ({ addNewProductPageService, productsPageService }) {
        await productsPageService.openAddNewProductPage();
        const createdProduct = await addNewProductPageService.create(
          data as IProduct
        );
        productName = createdProduct.name;
        await productsPageService.checkProductInTable(createdProduct);
        await productsPageService.checkProductInTable(createdProduct);
        await productsPageService.waitForAndValidateNotification(
          NOTIFICATIONS.PRODUCT_CREATED
        );
      }
    );
  });

  test.afterEach(async function ({ productsAPIService }) {
    if (productName) {
      await productsAPIService.deleteByName(productName);
      productName = '';
    }
  });
});

test.describe('[UI] [Products] Negative Create Validation Tests', () => {
  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  productUITestDataNegative.forEach(({ testName, tags, data }) => {
    test(
      testName,
      { tag: [...tags] },
      async function ({ addNewProductPageService, productsPageService }) {
        await productsPageService.openAddNewProductPage();
        await addNewProductPageService.createAndValidateInvalidProductDisabledSave(
          data as IProduct
        );
      }
    );
  });
});
