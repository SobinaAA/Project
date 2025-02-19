import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class EditOrderCustomerModal extends SalesPortalPage {
  uniqueElement = '//div[@role="dialog"]//h5';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Modal Content'] = this.findElement('.modal-content');
  readonly ['Modal footer'] = this.findElement('.modal-footer');
  readonly ['Input Customer'] = this.findElement('#inputCustomerOrder');
  readonly ['Save button'] = this.findElement('.modal-footer button#update-customer-btn');
  readonly ['Cancel button'] = this.findElement('.modal-footer//button[@id="cancel-edit-customer-modal-btn"]');
  readonly ['Close button'] = this.findElement('//div[@role="dialog"]//button[@aria-label="Close"]');
  //выпадающее меню, крестик, отмена и сохранить

  async selectCustomerByName(newCustomerName: string): Promise<void> {
    const dropdowns = this['Input Customer'];
    await dropdowns.selectOption({ value: newCustomerName });
  }

  async clickOnSaveButton() {
    await this.click(this['Save button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickOnCloseButton() {
    await this.click(this['Close button']);
  }

}
