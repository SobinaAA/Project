import { test as setup } from 'fixtures/services.fixture';

const authFile = 'src/.auth/user.json';

setup('Login to Sales Portal via API', async ({ signInApiService, page }) => {
  await signInApiService.loginAsAdmin();
  await page.context().storageState({ path: authFile });
});
