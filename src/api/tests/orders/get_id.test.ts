import { test } from 'fixtures/apiServices.fixture';
import { TAGS } from 'data/tags';

test.describe('[API] [Orders] [Sorting and filtering list of the Orders]', async function () {
  test.beforeAll(async ({ signInApiService }) => {
    await signInApiService.loginAsAdmin();
  });
  test(
    'Should GET the complete list of orders without sorting and filtering ',
    { tag: ['@example-1', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ ordersAPIService: ordersAPIService }) {
      const result = await ordersAPIService.getByID('67ac3cd59f31117d8c54562c');
      console.log(result);
    }
  );
});
