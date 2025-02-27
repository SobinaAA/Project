import { Page } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from 'config/env';
import { ILoginResponse, IUserCredentials } from 'data/types/user.types';
import { HomePage } from 'ui/pages/home.page';
import { SignInPage } from 'ui/pages/signIn.page';

export class SignInPageService {
  private signInPage: SignInPage;
  private homePage: HomePage;
  constructor(protected page: Page) {
    this.signInPage = new SignInPage(page);
    this.homePage = new HomePage(page);
  }

  async openSalesPortal() {
    await this.signInPage.openLoginPage();
  }

  async login(credentials: IUserCredentials) {
    await this.signInPage.fillCredentialsInputs(credentials);
    const response = await this.signInPage.interceprtResponse<
      ILoginResponse,
      never[]
    >(
      apiConfig.endpoints.Login,
      this.signInPage.clickSubmitButton.bind(this.signInPage)
    );
    await this.homePage.waitForOpened();
    this.page.context().addCookies([
      {
        name: 'Authorization',
        value: response.headers['authorization'],
        domain: 'anatoly-karpovich.github.io',
        path: '/aqa-course-project',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax'
      }
    ]);
  }

  async loginAsAdmin() {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  async getTransformedToken() {
    const token = (await this.page.context().cookies()).find(
      (cookie) => cookie.name === 'Authorization'
    )?.value;
    if (!token) throw new Error('No token found');
    return token;
  }
}
