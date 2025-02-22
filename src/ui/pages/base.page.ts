import { Locator, Page } from '@playwright/test';
import { IResponse } from 'data/types/api.types';
import { IWaitUntilOptions } from 'data/types/page/waitUntil.types';

const TIMEOUT_5_SECS = 5000;
const DEFAULT_TIMEOUT = 10000;

export type Selector = string | Locator;

export function isSelector(selector: Selector): selector is string {
  return typeof selector === 'string';
}

export abstract class BasePage {
  constructor(protected page: Page) {}

  findElement(locator: string | Locator) {
    return isSelector(locator) ? this.page.locator(locator) : locator;
  }

  async findElementArray(selectorOrElement: string | Locator) {
    const elements = !isSelector(selectorOrElement)
      ? await selectorOrElement.all()
      : await this.findElement(selectorOrElement).all();
    return elements;
  }

  async waitForElement(
    selector: string | Locator,
    state: 'attached' | 'detached' | 'visible' | 'hidden' = 'visible',
    timeout = DEFAULT_TIMEOUT
  ) {
    const element = this.findElement(selector);
    await element.waitFor({ state, timeout });
    return element;
  }

  async waitForElementAndScroll(
    selector: string | Locator,
    timeout = DEFAULT_TIMEOUT
  ) {
    const element = await this.waitForElement(selector, 'visible');
    try {
      await element.scrollIntoViewIfNeeded({ timeout });
      return element;
    } catch (error) {
      throw error;
    }
  }

  async click(locator: string | Locator, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    await element.click();
  }

  async setValue(
    locator: string | Locator,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    await element.fill(String(value), { timeout });
  }

  async getText(locator: string | Locator, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    return await element.innerText({ timeout });
  }

  async selectDropdownValue(
    dropdownLocator: string | Locator,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ) {
    const element = await this.waitForElementAndScroll(
      dropdownLocator,
      timeout
    );
    await element.selectOption(String(value), { timeout });
  }

  async openPage(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitUntil(
    condition: () => Promise<boolean>,
    options?: IWaitUntilOptions
  ) {
    const interval = options?.interval ?? 500;
    const timeout = options?.timeout ?? 10000;
    const timeoutMessage =
      options?.timeoutMsg || `Condition not met within the specified timeout.`;
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
      if (await condition()) {
        return;
      }

      await this.page.waitForTimeout(interval);
      elapsedTime += interval;
    }

    throw new Error(timeoutMessage);
  }

  async interceprtResponse<T>(
    url: string,
    triggerAction: () => Promise<void>
  ): Promise<IResponse<T>> {
    const [response] = await Promise.all([
      this.page.waitForResponse(url),
      triggerAction()
    ]);
    return {
      status: response.status(),
      body: (await response.json()) as T,
      headers: response.headers()
    };
  }

  async interceprtRequest(url: string, triggerAction: () => Promise<void>) {
    const [request] = await Promise.all([
      this.page.waitForRequest((request) => request.url().includes(url)),
      triggerAction()
    ]);
    return request;
  }
}
