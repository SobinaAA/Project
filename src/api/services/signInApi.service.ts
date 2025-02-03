import { ADMIN_USERNAME, ADMIN_PASSWORD } from 'config/env';
import { STATUS_CODES } from 'data/statusCodes';
import { SignInController } from 'api/controllers/signIn.controller';
import { validateResponse } from 'utils/validation/apiValidation';
import { logStep } from 'utils/report/logStep';

export class SignInApiService {
  private token: string = '';

  constructor(private signInClient = new SignInController()) {}

  @logStep('Login as admin via API')
  async loginAsAdmin() {
    const response = await this.signInClient.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    this.token = response.headers['authorization'];
    return this.getTransformedToken();
  }

  async getTransformedToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return `Bearer ${this.token}`;
  }

  async getToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return this.token;
  }
}
