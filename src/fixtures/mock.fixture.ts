import { test as base } from "./apiServices.fixture";
import { STATUS_CODES } from "../data/statusCodes";
import { Page } from "@playwright/test";

export class Mock {
  constructor(private page: Page) {}

  public async modifyReponse<T>(url: string, body: T, status: STATUS_CODES) {
    await this.page.route(url, async (routeForModifications, request) => {
      // Can be filtered, for example by method like below:
      //
      // if (request.method() === 'POST') {
      //     await route.continue()
      //     return
      // }
      await routeForModifications.fulfill({
        json: body,
        status: status,
      });
    });
  }
}

interface MockFixture {
  mock: Mock;
}

export const test = base.extend<MockFixture>({
  mock: async ({ page }, use) => {
    await use(new Mock(page));
  },
});
