import { test, expect } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import {
  productMock,
  productsListMock,
  productsMock
} from 'data/mock/products.mock';
import { STATUS_CODES } from 'data/statusCodes';

test.describe(`[UI] [Products] Component tests of Products block (UI check, screenshots)`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should see the Products block highlighted in the side menu',
    { tag: ['@1ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService }) {
      await homePageService.openProductsPage();
      await homePageService.checkLeftMenuIllumination('Products');
    }
  );

  test(
    'Should see a correct UI for products list with mock data',
    { tag: ['@2ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, mock, productsListPage }) {
      const mockData = structuredClone(productsListMock);
      await mock.modifyReponse(
        /\/api\/products\?.*/,
        mockData,
        STATUS_CODES.OK
      );
      await homePageService.openProductsPage();
      await expect(productsListPage['Title Content']).toHaveScreenshot();
      await expect(productsListPage['Main Content']).toHaveScreenshot();
    }
  );

  test(
    'Should see a correct UI for delete product modal window (via products list)',
    { tag: ['@3ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, productsPageService }) {
      await homePageService.openProductsPage();
      await productsPageService.checkUIModalDelete();
    }
  );

  test(
    'Should see a correct UI for add new product page',
    { tag: ['@4ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, productsPageService }) {
      await homePageService.openProductsPage();
      await productsPageService.openAddNewProductPage();
      await productsPageService.checkUIAddNewProductPage();
    }
  );

  test(
    'Should see a correct UI for edit product page with mock data',
    { tag: ['@5ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, productsPageService, mock }) {
      const mockData = structuredClone(productMock);
      await homePageService.openProductsPage();
      await mock.modifyReponse(
        /\/api\/products\/[a-f0-9]{24}\/$/,
        mockData,
        STATUS_CODES.OK
      );
      await productsPageService.openEditRandomProduct();
      await productsPageService.checkEditProductPage();
    }
  );

  // test(
  //   'Should see a correct UI for details product page with mock data',
  //   { tag: ['@6ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
  //   async function ({ homePageService, productsPageService, mock }) {
  //     const mockData = structuredClone(productMock);
  //     await homePageService.openProductsPage();
  //     await mock.modifyReponse(
  //       /\/api\/products\/[a-f0-9]{24}\/$/,
  //       mockData,
  //       STATUS_CODES.OK
  //     );
  //     await productsPageService.openDetailsRandomProduct();
  //     await productsPageService.checkDetailsProductPage();
  //   }
  // );

  test(
    'Should see a correct UI for delete product modal window (via edit product)',
    { tag: ['@7ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      homePageService,
      productsPageService,
      editProductPageService
    }) {
      await homePageService.openProductsPage();
      await productsPageService.openEditRandomProduct();
      await editProductPageService.clickDeleteOnEditPage();
      await editProductPageService.checkUIDeleteModal;
    }
  );

  test(
    'Should check Edit Product layout',
    { tag: ['@8ProdCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      homePageService,
      //editProductPage,
      productsPageService,
      mock
    }) {
      await mock.products(productsMock.Products);
      await homePageService.openProductsPage();
      await mock.product(productMock.Product);
      await productsPageService.openEditProductPage(productMock.Product.name);
      //await expect(editProductPage['Main Content']).toHaveScreenshot();
    }
  );
});
