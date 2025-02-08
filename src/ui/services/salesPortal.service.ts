import { expect, Page } from '@playwright/test';
import { HomePage } from 'ui/pages/home.page';
import { NOTIFICATIONS } from 'data/notifications';
import { CustomersListPage } from 'ui/pages/customers/customers.page';

export abstract class SalesPortalPageService {
  protected page: Page;
  protected homePage: HomePage;
  protected customersPage: CustomersListPage;
  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
  }

  async validateNotification(text: NOTIFICATIONS) {
    const notificationText = await this.homePage.getLastNotificationText();
    expect(notificationText).toBe(text);
  }

  async checkLeftMenuOption(name: string) {
    await expect(this.homePage['Menu Option'](name)).toHaveClass(
      /(^|\s)active(\s|$)/
    );
    await expect(this.homePage['Left Menu']).toHaveScreenshot();
  }

  async checkMainContent() {
    await expect(this.customersPage['Main Content']).toHaveScreenshot();
  }

  async checkFilterContent() {
    await expect(this.customersPage['Modal Content']).toHaveScreenshot();
  }
}
