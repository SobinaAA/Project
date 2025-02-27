import { ADMIN_USERNAME, ADMIN_PASSWORD } from 'config/env';
import { STATUS_CODES } from 'data/statusCodes';
import { SignInController } from 'api/controllers/signIn.controller';
import { validateResponse } from 'utils/validation/apiValidation';
import { Page } from '@playwright/test';

export class SignInApiService {
  private token: string = '';

  constructor(
    private page: Page,
    private signInClient = new SignInController()
  ) {}

  async loginAsAdmin() {
    const response = await this.signInClient.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    this.token = response.headers['authorization'];
    this.page.context().addCookies([
      {
        name: 'Authorization',
        value: this.token,
        domain: 'anatoly-karpovich.github.io',
        path: '/aqa-course-project',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax'
      }
    ]);
    return this.getTransformedToken();
  }

  async getTransformedToken() {
    const token = await this.getTokenFromPage();
    return `Bearer ${token}`;
  }

  async getToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return this.token;
  }

  async getTokenFromPage() {
    const token = (await this.page.context().cookies()).find(
      (cookie) => cookie.name === 'Authorization'
    );
    if (!token) throw new Error('No token found');
    return token.value;
  }
}
