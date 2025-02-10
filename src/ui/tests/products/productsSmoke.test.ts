import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { generateProductData } from 'data/products/generateProduct';
import { NOTIFICATIONS } from 'data/notifications';

test.describe(`[UI] [Products] Products Smoke tests`, async function () {
  let productName = '';

  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  test(
    'Add New Products Smoke test',
    { tag: ['@1Product-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ addNewProductPageService, productsPageService }) {
      await productsPageService.openAddNewProductPage();
      const createdProduct = await addNewProductPageService.create();
      productName = createdProduct.name;
      await productsPageService.validateNotification(
        NOTIFICATIONS.PRODUCT_CREATED
      );
      await productsPageService.checkProductInTable(createdProduct);
    }
  );

  test(
    'Delete Product from Products Smoke test',
    { tag: ['@2Product-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ addNewProductPageService, productsPageService }) {
      const product = generateProductData();
      await productsPageService.openAddNewProductPage();
      await addNewProductPageService.create(product);
      productName = product.name;
      await productsPageService.checkProductInTable(product);
      await productsPageService.deleteProduct(product.name);
      await productsPageService.waitForAndValidateNotification(
        NOTIFICATIONS.PRODUCT_DELETED
      );
    }
  );

  test(
    'Edit Product Smoke test',
    { tag: ['@3Product-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      addNewProductPageService,
      productsPageService,
      editProductsPageService
    }) {
      await productsPageService.openAddNewProductPage();
      const product = await addNewProductPageService.create();
      await productsPageService.checkProductInTable(product);
      const updatedProduct = generateProductData();
      productName = updatedProduct.name;
      await editProductsPageService.editCreatedProduct(
        product.name,
        updatedProduct
      );
      await productsPageService.checkProductInTable(updatedProduct);
      await productsPageService.waitForAndValidateNotification(
        NOTIFICATIONS.EDIT_SUCCESS
      );
    }
  );

  test(
    'Delete from Edit Product Smoke test',
    { tag: ['@4Product-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      addNewProductPageService,
      productsPageService,
      editProductsPageService
    }) {
      const product = generateProductData();
      await productsPageService.openAddNewProductPage();
      await addNewProductPageService.create(product);
      productName = product.name;
      await productsPageService.checkProductInTable(product);
      await productsPageService.openEditProductPage(product.name);
      await editProductsPageService.editDeletedProduct();
      await productsPageService.waitForAndValidateNotification(
        NOTIFICATIONS.PRODUCT_DELETED
      );
    }
  );

  test(
    'Edit from Details Product Smoke test',
    { tag: ['@5Product-SMOKE', '@tania-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      addNewProductPageService,
      productsPageService,
      editProductsPageService
    }) {
      await productsPageService.openAddNewProductPage();
      const product = await addNewProductPageService.create();
      await productsPageService.checkProductInTable(product);
      await productsPageService.openEditFromDetailsProduct(product);
      const updatedProduct = generateProductData();
      productName = updatedProduct.name;
      await editProductsPageService.editCreatedProductFromDetails(
        updatedProduct
      );
      await productsPageService.waitForAndValidateNotification(
        NOTIFICATIONS.EDIT_SUCCESS
      );
    }
  );

  test.afterEach(async function ({ productsAPIService }) {
    if (productName) {
      await productsAPIService.deleteByName(productName);
      productName = '';
    }
  });
});
