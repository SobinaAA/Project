import { SalesPortalPage } from '../salesPortal.page';

export class DeleteProductModal extends SalesPortalPage {
  uniqueElement = '//div[@role="dialog"]';
  readonly ['Modal container'] = '.toast-container';
  readonly ['Modal Content'] = this.findElement('.modal-content');
  readonly ['Delete button'] = this.findElement(
    `${this['Modal container']}//button[@type="submit"]`
  );
  readonly ['Cancel button'] = this.findElement(
    `${this['Modal container']}//button[contains(@class, "btn-secondary")]`
  );
  readonly ['Title'] = this.findElement(`${this['Modal container']}//h5`);

  async waitForPageOpened(): Promise<void> {
    await this.waitForOpened();
  }

  async getTitleText(): Promise<string> {
    return await this.getText(this['Title']);
  }

  async clickOnDeleteButton() {
    await this.click(this['Delete button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }
}
