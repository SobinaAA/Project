import { expect, Page } from '@playwright/test';
import { HomePage } from 'ui/pages/home.page';
import { NOTIFICATIONS } from 'data/notifications';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { ProductsListPage } from 'ui/pages/products/products.page';

export abstract class SalesPortalPageService {
  protected page: Page;
  protected homePage: HomePage;
  protected customersPage: CustomersListPage;
  protected productsPage: ProductsListPage;
  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
    this.productsPage = new ProductsListPage(page);
  }

  async validateNotification(text: NOTIFICATIONS) {
    const notificationText = await this.homePage.getLastNotificationText();
    expect(notificationText).toBe(text);
  }

  async waitForAndValidateNotification(
    expectedText: string,
    timeout: number = 10000
  ): Promise<void> {
    await this.productsPage.waitForNotification(expectedText, timeout);
    const notificationText = await this.homePage.getLastNotificationText();
    expect(notificationText.trim()).toBe(expectedText);
  }

  async checkLeftMenuOption(name: string) {
    await expect(this.homePage['Menu Option'](name)).toHaveClass(
      /(^|\s)active(\s|$)/
    );
    await expect(this.homePage['Left Menu']).toHaveScreenshot('Left Menu.png');
  }

  async checkMainContent() {
    await expect(this.customersPage['Main Content']).toHaveScreenshot();
  }

  async checkFilterContent() {
    await expect(this.customersPage['Modal Content']).toHaveScreenshot();
  }
}
