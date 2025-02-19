import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class AddNewOrderModal extends SalesPortalPage {
  uniqueElement = '.modal-title';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Modal Content'] = this.findElement('.modal-content');
  readonly ['Add Product button'] = this.findElement('#add-product-btn');
  readonly ['Create button']= this.findElement('#create-order-btn');
  readonly ['Cancel button'] = this.findElement('#cancel-order-modal-btn');
  readonly ['Customer Order input'] = this.findElement('#inputCustomerOrder');
  readonly ['Product Order input'] = this.findElement(
    `${this['Modal container']}//select[@name="Product"]`
  );
  readonly ['Title text'] = this.findElement(
    `${this['Modal container']}//h5`
  );

  async waitForPageOpened(): Promise<void> {
    await this.waitForOpened();
  }

  async getTitleText(): Promise<string> {
    return await this.getText(this['Title text']);
  }

  async clickOnAddProductButton() {
    await this.click(this['Add Product button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickOnCreateButton() {
    await this.click(this['Create button']);
  }

  async selectCustomer(customerName: string): Promise<void> {
    await this['Customer Order input'].selectOption({ label: customerName });
  }

  async selectProductByName(productName: string, dropdownIndex: number = 0): Promise<void> {
    const dropdowns = this['Product Order input'];
    const targetDropdown = dropdowns.nth(dropdownIndex);
    await this.waitForElement(targetDropdown, 'visible');
    await targetDropdown.selectOption({ label: productName });
  }
}
