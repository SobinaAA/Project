import { test } from 'fixtures/services.fixture';
import { NOTIFICATIONS } from 'data/notifications';
import { IProduct } from 'data/types/product.types';
import {
  editProductUITestDataNegative,
  editProductUITestDataPositive
} from 'data/products/testProductsData/editProductUI.data';

test.describe('[UI] [Products] Positive Edit Validation Tests', async function () {
  let productName = '';
  let createdProduct: IProduct;

  test.beforeEach(
    async ({ signInPageService, homePageService, productsAPIService }) => {
      createdProduct = await productsAPIService.create();
      await signInPageService.openSalesPortal();
      await signInPageService.loginAsAdmin();
      await homePageService.openProductsPage();
    }
  );

  editProductUITestDataPositive.forEach(({ testName, tags, data }) => {
    test(
      testName,
      { tag: [...tags] },
      async function ({ productsPageService, editProductPageService }) {
        await editProductPageService.editCreatedProduct(
          createdProduct.name,
          data as IProduct
        );
        productName = data.name;
        await productsPageService.checkProductInTable(data as IProduct);
        await productsPageService.waitForAndValidateNotification(
          NOTIFICATIONS.EDIT_SUCCESS
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

test.describe('[UI] [Products] Negative Edit Validation Tests', async function () {
  let productName = '';
  let createdProduct: IProduct;

  test.beforeEach(
    async ({ signInPageService, homePageService, productsAPIService }) => {
      createdProduct = await productsAPIService.create();
      await signInPageService.openSalesPortal();
      await signInPageService.loginAsAdmin();
      await homePageService.openProductsPage();
    }
  );

  editProductUITestDataNegative.forEach(({ testName, tags, data }) => {
    test(
      testName,
      { tag: [...tags] },
      async function ({ productsPageService, editProductPageService }) {
        productName = createdProduct.name;
        await productsPageService.openEditProductPage(createdProduct.name);
        await editProductPageService.editAndValidateInvalidProductDisabledSave(
          data as IProduct
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
