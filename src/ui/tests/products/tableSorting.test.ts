import { apiConfig } from 'config/apiConfig';
import { ProductsMockBuilder } from 'data/mock/products.mock';
import { IProductsResponse } from 'data/types/product.types';
import { expect, test } from 'fixtures/services.fixture';

const sortTableData: IProductsResponse['sorting'][] = [
  {
    sortField: 'createdOn',
    sortOrder: 'asc'
  },
  {
    sortField: 'createdOn',
    sortOrder: 'desc'
  },
  {
    sortField: 'name',
    sortOrder: 'asc'
  },
  {
    sortField: 'name',
    sortOrder: 'desc'
  },
  {
    sortField: 'manufacturer',
    sortOrder: 'asc'
  },
  {
    sortField: 'manufacturer',
    sortOrder: 'desc'
  },
  {
    sortField: 'price',
    sortOrder: 'asc'
  },
  {
    sortField: 'price',
    sortOrder: 'desc'
  }
];

test.describe('[UI] [Products] [Table Component] Table Sorting', async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
  });

  test('Check default table sorting', async function ({
    productsListPage,
    homePage,
    homePageService
  }) {
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    await expect(productsListPage['Table Headers section']).toHaveScreenshot();
  });

  test('Check with no products', async function ({
    homePage,
    homePageService,
    productsListPage,
    mock
  }) {
    const mockData = new ProductsMockBuilder()
      .setSorting('createdOn', 'asc')
      .build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    await expect(productsListPage.Table).toHaveScreenshot();
  });

  sortTableData.forEach(({ sortField, sortOrder }) => {
    test(`Check table headers sorted by ${sortField} and ${sortOrder}`, async function ({
      productsListPage,
      mock,
      page
    }) {
      const mockData = new ProductsMockBuilder()
        .setSorting(sortField, sortOrder)
        .setProduct()
        .build();
      await mock.products(mockData);
      // await homePage.waitForOpened();
      // await homePageService.openProductsPage();
      await page.evaluate(async () => {
        await (
          window as typeof window & { renderProductsPage: () => Promise<void> }
        ).renderProductsPage();
      });
      await expect(productsListPage.Table).toHaveScreenshot();
    });
  });

  test(`Check sorting query by createdOn and asc`, async function ({
    productsListPage,
    homePage,
    homePageService
  }) {
    const { sortField, sortOrder } = sortTableData[0];
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Created On'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=${sortField}&sortOrder=${sortOrder}`
    );
  });

  test(`Check sorting query by createdOn and desc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const sortField = 'createdOn';
    const sortOrder = 'desc';
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    await productsListPage.clickOnTableHeader('Created On');
    await productsListPage.waitForOpened();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Created On'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=${sortField}&sortOrder=${sortOrder}`
    );
  });

  test(`Check sorting query by name and asc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Name'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=name&sortOrder=asc`
    );
  });

  test(`Check sorting query by name and desc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    await productsListPage.clickOnTableHeader('Name');
    await productsListPage.waitForOpened();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Name'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=name&sortOrder=desc`
    );
  });

  test(`Check sorting query by price and asc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Price'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=price&sortOrder=asc`
    );
  });

  test(`Check sorting query by price and desc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    await productsListPage.clickOnTableHeader('Price');
    await productsListPage.waitForOpened();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Price'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=price&sortOrder=desc`
    );
  });

  test(`Check sorting query by manufacturer and asc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Manufacturer'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=manufacturer&sortOrder=asc`
    );
  });

  test(`Check sorting query by manufacturer and desc`, async function ({
    productsListPage,
    homePage,
    homePageService,
    mock
  }) {
    const mockData = new ProductsMockBuilder().setProduct().build();
    await mock.products(mockData);
    await homePage.waitForOpened();
    await homePageService.openProductsPage();
    await productsListPage.clickOnTableHeader('Manufacturer');
    await productsListPage.waitForOpened();
    const request = await productsListPage.interceprtRequest(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}`,
      productsListPage.clickOnTableHeader.bind(productsListPage),
      'Manufacturer'
    );
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.Products}?sortField=manufacturer&sortOrder=desc`
    );
  });
});
