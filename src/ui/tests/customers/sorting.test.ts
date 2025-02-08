import { test } from 'fixtures/services.fixture';
import { TAGS } from 'data/tags';
import { direction, sortMethodCustomers } from 'data/types/sorting.types';

test.describe(`[UI] [Customers] Sorting the list of customers`, async function () {
  test.beforeEach(async ({ signInPageService }) => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  let i = 1;
  for (const keyField of ['Name', 'Email', 'Country', 'Created On']) {
    for (const order of ['asc', 'desc']) {
      const tag = `@${i}CustSort-UI`;
      i++;
      test(
        `Should get list of cystomers sorted by ${keyField} - ${order} order`,
        {
          tag: [
            tag,
            '@alena-customers-UI',
            '@customers-sorting',
            TAGS.REGRESSION,
            TAGS.SMOKE
          ]
        },
        async function ({ customersPageService, homePageService }) {
          await homePageService.openCustomersPage();
          console.log(keyField, order);
          await customersPageService.sortBy(
            keyField as sortMethodCustomers,
            order as direction
          );
          await customersPageService.checkSorting(
            keyField as sortMethodCustomers,
            order as direction
          );
        }
      );
    }
  }
});
