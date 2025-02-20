import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { COUNTRIES } from 'data/customers/countries';

test.describe(`[UI] [Customers] Filter rhe list of customers by Country`, async function () {
  test.beforeEach(async ({ signInPageService, homePageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openCustomersPage();
  });
  for (const iter in COUNTRIES) {
    const country = COUNTRIES[iter];
    const tag = `@${iter}CustFilter-UI`;
    test(
      `Should filter the table with ${country}`,
      {
        tag: [
          tag,
          '@alena-customers-UI',
          '@customers-filter',
          TAGS.REGRESSION,
          TAGS.SMOKE
        ]
      },
      async function ({ customersPageService }) {
        await customersPageService.filterCustomersByCountry(country);
        await customersPageService.checkFilterByCountry(country);
      }
    );
  }
});
