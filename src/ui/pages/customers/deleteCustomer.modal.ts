import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class DeleteCustomerModal extends SalesPortalPage {
  uniqueElement = '//div[@role="dialog"]';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Modal Content'] = this.findElement('.modal-content');

  readonly ['Cancel button'] = this.findElement(
    `${this['Modal container']}//button[contains(@class, "btn-secondary")]`
  );
  readonly ['Title'] = this.findElement(`${this['Modal container']}//h5`);
  readonly 'Button close' = 'button[type="button"], [aria-label="Close"]';
  readonly 'Modal text' = '.modal-body p';
  readonly ['Delete button'] = this.findElement(
    `${this['Modal container']}//button[@type="submit"]`
  );

  async clickOnCloseButton() {
    await this.click(this['Button close']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForOpened();
  }

  async clickOnDeleteButton() {
    await this.click(this['Delete button']);
  }
}
