import { expect, test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import {
  emptyListOfOrders,
  oneOrderMock,
  ordersListMock
} from 'data/mock/orders.mock';
import { STATUS_CODES } from 'data/statusCodes';
import { customersMyPageMock } from 'data/mock/customers.mock';
import { productsListMock } from 'data/mock/products.mock';

test.describe(`[UI] [Orders] Component tests of Orders block (UI check, screenshots)`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test(
    'Should see the Customers block highlighted in the side menu',
    { tag: ['@1OrderCom-UI', '@alena-UI-orders', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, ordersListPageService }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.checkLeftMenuOption('Orders');
    }
  );

  test(
    'Should see a correct UI for orders list with mock data',
    { tag: ['@2OrderCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, mock, ordersPage }) {
      const mockData = structuredClone(ordersListMock);
      await mock.modifyReponse(/\/api\/orders\?.*/, mockData, STATUS_CODES.OK);
      await homePageService.openOrdersPage();
      await expect(ordersPage['Title Content']).toHaveScreenshot(
        'Title anf filter.png',
        { maxDiffPixels: 20 }
      );
      await expect(ordersPage['Main Content']).toHaveScreenshot(
        'List of orders.png',
        { maxDiffPixels: 20 }
      );
    }
  );

  test(
    'Should see a correct UI for details page with mock data',
    { tag: ['@3OrderCom-UI', '@alena-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({
      homePageService,
      ordersListPageService,
      mock,
      orderDetailsPageService
    }) {
      const mockData = structuredClone(oneOrderMock);
      const mockDataCustomers = structuredClone(customersMyPageMock);
      await homePageService.openOrdersPage();
      await mock.modifyReponse(
        /\/api\/orders\/[a-f0-9]{24}\/$/,
        mockData,
        STATUS_CODES.OK
      );
      await mock.modifyReponse(
        /\/api\/customers\?.*/,
        mockDataCustomers,
        STATUS_CODES.OK
      );
      await ordersListPageService.openDetailsRandomCustomer();
      await orderDetailsPageService.checkDetailsPage();
    }
  );

  test(
    'Should see a correct UI for add new order modal with mock data',
    { tag: ['@4OrderCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, mock, ordersListPageService }) {
      const mockDataCustomers = structuredClone(customersMyPageMock);
      const mockDataProducts = structuredClone(productsListMock);
      await homePageService.openOrdersPage();
      await mock.modifyReponse(
        /\/api\/customers\?.*/,
        mockDataCustomers,
        STATUS_CODES.OK
      );
      await mock.modifyReponse(
        /\/api\/products\?.*/,
        mockDataProducts,
        STATUS_CODES.OK
      );
      await ordersListPageService.openAddNewOrderModal();
      await ordersListPageService.checkAddNewOrderModal();
    }
  );

  test(
    'Should see the correct filter modal',
    { tag: ['@5OrderCom-UI', '@alena-UI-orders', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, ordersListPageService }) {
      await homePageService.openOrdersPage();
      await ordersListPageService.checkLeftMenuOption('Orders');
      await ordersListPageService.openFiltersModal();
      await ordersListPageService.checkFilterModal();
    }
  );

  test(
    'Should see a correct UI for empty list with mock data',
    { tag: ['@6OrderCom-UI', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ homePageService, mock, ordersListPageService }) {
      const mockData = structuredClone(emptyListOfOrders);
      await mock.modifyReponse(/\/api\/orders\?.*/, mockData, STATUS_CODES.OK);
      await homePageService.openOrdersPage();
      await ordersListPageService.checkEmptyList();
    }
  );
});
