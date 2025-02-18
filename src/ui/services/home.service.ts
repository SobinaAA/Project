import { expect, Page } from '@playwright/test';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { ProductsListPage } from 'ui/pages/products/products.page';
import { HomePage } from 'ui/pages/home.page';
import { Metric } from 'data/types/home.types';
import numeral from 'numeral';
import { OrdersListPage } from 'ui/pages/orders/orders.page';

export class HomePageService {
  private homePage: HomePage;
  private customersPage: CustomersListPage;
  private productsPage: ProductsListPage;
  private ordersListPage: OrdersListPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
    this.productsPage = new ProductsListPage(page);
    this.ordersListPage = new OrdersListPage(page);
  }

  async checkLeftMenuIllumination(name: string) {
    await expect(this.homePage['Menu Option'](name)).toHaveClass(
      /(^|\s)active(\s|$)/
    );
    await expect(this.homePage['Left Menu']).toHaveScreenshot();
  }

  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  async openOrdersPage() {
    await this.homePage.clickOnViewDetailsButton('Orders');
    await this.homePage.waitForSpinnerToHide();
    await this.ordersListPage.waitForOpened();
  }

  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton('Customers');
    await this.homePage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }

  async validateMetric(metric: Metric, value: number) {
    const actualValue = await this.homePage.getMetricValue(metric);
    let expectedValue: string | number;
    switch (metric) {
      case 'Total Orders': {
        expectedValue = value;
        break;
      }
      case 'Total Revenue': {
        expectedValue = `$${numeral(value).format('0.0a')}`;
        break;
      }

      case 'Avg Order Value': {
        expectedValue = `$${numeral(value).format('0.0a')}`;
        break;
      }

      case 'Canceled Orders': {
        expectedValue = value;
        break;
      }
      case 'New Customers': {
        expectedValue = value;
        break;
      }
    }
    expect(actualValue).toBe(expectedValue);
  }

  async checkMetricLayout(metric: Metric) {
    const container = this.homePage.getMetricContainer(metric);
    await expect(container).toHaveScreenshot();
  }
}
