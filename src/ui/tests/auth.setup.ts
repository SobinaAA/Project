import { test as setup } from 'fixtures/services.fixture';

const authFile = 'src/.auth/user.json';

setup('Login to Sales Portal via API', async ({ signInApiService, page }) => {
  await signInApiService.loginAsAdmin();
  await page.context().addCookies([
    {
      name: 'Authorization',
      value: await signInApiService.getToken(),
      domain: 'anatoly-karpovich.github.io',
      path: '/aqa-course-project',
      expires: -1,
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }
  ]);
  await page.context().storageState({ path: authFile });
});
