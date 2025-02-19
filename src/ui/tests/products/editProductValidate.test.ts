import { test } from 'fixtures/services.fixture';
import { NOTIFICATIONS } from 'data/notifications';
import { IProduct } from 'data/types/product.types';
import {
  editProductUITestDataNegative,
  editProductUITestDataPositive
} from 'data/products/testProductsData/editProductUI.data';

test.describe('[UI] [Products] Positive Edit Validation Tests', async function () {
  let productName = '';

  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  editProductUITestDataPositive.forEach(({ testName, tags, data }) => {
    test(
      testName,
      { tag: [...tags] },
      async function ({
        addNewProductPageService,
        productsPageService,
        editProductPageService
      }) {
        await productsPageService.openAddNewProductPage();
        const createdProduct = await addNewProductPageService.create();
        await productsPageService.checkProductInTable(createdProduct);
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

  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  editProductUITestDataNegative.forEach(({ testName, tags, data }) => {
    test(
      testName,
      { tag: [...tags] },
      async function ({
        addNewProductPageService,
        productsPageService,
        editProductPageService
      }) {
        await productsPageService.openAddNewProductPage();
        const validProduct = await addNewProductPageService.create();
        productName = validProduct.name;
        await productsPageService.openEditProductPage(validProduct.name);
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
