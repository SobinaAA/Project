import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class DeleteCustomerModal extends SalesPortalPage {
  readonly uniqueElement = '.modal';

  readonly 'Modal title' = 'h5.modal-title';
  readonly 'Button close' = 'button[type="button"], [aria-label="Close"]';
  readonly 'Modal text' = '.modal-body p';
  readonly 'Button yes' = '.modal-footer-mr > button[type = "submit"]';
  readonly 'Button no' = '.modal-footer-mr > button[type = "button"]';

  async clickOnYesButton() {
    await this.click(this['Button yes']);
  }

  async clickOnCloseButton() {
    await this.click(this['Button close']);
  }

  async clickOnButtonNo() {
    await this.click(this['Button no']);
  }
}
