import { expect, Page } from "@playwright/test";
import { CustomersListPage } from "../pages/customers/customers.page";
import { HomePage } from "../pages/home.page";
import { Metric } from "../../data/types/home.types";
import numeral from "numeral";

export class HomePageService {
  private homePage: HomePage;
  private customersPage: CustomersListPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
  }

  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton("Customers");
    await this.homePage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }

  async validateMetric(metric: Metric, value: number) {
    const actualValue = await this.homePage.getMetricValue(metric);
    let expectedValue: string | number;
    switch (metric) {
      case "Total Orders": {
        expectedValue = value;
        break;
      }
      case "Total Revenue": {
        expectedValue = `$${numeral(value).format("0.0a")}`;
        break;
      }

      case "Avg Order Value": {
        expectedValue = `$${numeral(value).format("0.0a")}`;
        break;
      }

      case "Canceled Orders": {
        expectedValue = value;
        break;
      }
      case "New Customers": {
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
