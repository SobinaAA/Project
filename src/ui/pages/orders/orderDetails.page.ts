import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import { expect } from '@playwright/test';

export class OrdersDetailsPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Order Details"]';
  readonly 'Edit Customer pencil' = this.findElement('#edit-customer-pencil');
  readonly 'Edit Products pencil' = this.findElement('#edit-products-pencil');
  readonly 'Customer Details' = this.findElement(
    '#customer-section .c-details'
  );
  readonly 'Requested Products Container' =
    this.findElement('#products-section');
  readonly 'productDetailSelector' = '.c-details';
  readonly 'productNameSelector' = 'span.s-span';
  readonly 'Products Section' = this.findElement('#products-section');
  readonly 'Edit Products Button' = this.findElement(
    '#products-section button'
  );
  readonly 'Title Content' = this.findElement('#order-details-header');
  readonly 'Customer Section' = this.findElement('#customer-section');
  readonly 'Tabs' = this.findElement('#order-details-tabs-section');
  readonly 'Delivery tab' = this.findElement('[aria-controls="delivery"]');
  readonly 'History tab' = this.findElement('[aria-controls="history"]');
  readonly 'Comments tab' = this.findElement('[aria-controls="comments"]');
  readonly 'Comments Input' = this.findElement('#textareaComments');
  readonly 'Create Comment Button' = this.findElement('#create-comment-btn');
  readonly 'All comments' = '.m-0';
  readonly 'Error Comment Area' = this.findElement('#error-textareaComments');
  readonly 'Delete Comment Button' = (comment: string) =>
    this.findElement(`//p[contains(text(),'${comment}')]/../div/button`);
  readonly 'Cancel Order Button' = this.findElement('#cancel-order');
  readonly 'Status' = this.findElement(
    '//div[@id = "title"]//span[contains(text(),"Status")]/following-sibling::span'
  );
  readonly 'Schedule Delivery button' = this.findElement('#delivery-btn');

  async getStatus() {
    const actualStatus = await this.getText(this['Status']);
    return actualStatus;
  }

  async clickOnCancelOrderButton() {
    await this.click(this['Cancel Order Button']);
  }

  async clickOnDeleteComment(comment: string) {
    await this.click(this['Delete Comment Button'](comment));
  }

  async clickOnScheduleDelivery() {
    await this.click(this['Schedule Delivery button']);
  }

  async fillCommentInput(text: string) {
    await this.setValue(this['Comments Input'], text);
  }

  async clickOnCreateComment() {
    await this.click(this['Create Comment Button']);
  }

  async clickOnEditCustomer() {
    await this.click(this['Edit Customer pencil']);
  }

  async clickOnEditProducts() {
    await this.click(this['Edit Products pencil']);
  }

  async getCustomerNameFromDetails(): Promise<string> {
    const detailsLocator = this['Customer Details'].filter({ hasText: 'Name' });
    const nameLocator = detailsLocator
      .locator(this['productNameSelector'])
      .nth(1);
    return (await nameLocator.textContent()) || '';
  }

  async checkProductNotPresent(productName: string): Promise<void> {
    const productLocator = this['Requested Products Container'].locator(
      `text=${productName}`
    );
    await expect(productLocator).toHaveCount(0, { timeout: 5000 });
  }

  async checkDeliveryStatus() {
    const firstHistoryElement = this.page
      .locator('#history-body .accordion .accordion-header')
      .first();
    const textContent = await firstHistoryElement.textContent();
    if (textContent) {
      if (
        textContent.includes('Order created') ||
        textContent.includes('Delivery Scheduled')
      ) {
        return 'created';
      }
      if (textContent.includes('Delivery Edited')) {
        return 'changed';
      }
    }
  }

  async getLastProductName(): Promise<string> {
    const nameDetails = this['Requested Products Container']
      .locator(this.productDetailSelector)
      .filter({ hasText: 'Name' });
    const count = await nameDetails.count();
    const lastDetail = nameDetails.nth(count - 1);
    const productNameLocator = lastDetail
      .locator(this['productNameSelector'])
      .nth(1);
    const productName = await productNameLocator.textContent();
    return productName || '';
  }

  async openDeliveryTab() {
    this['Delivery tab'].click();
  }

  async openHistoryTab() {
    this['History tab'].click();
  }

  async openCommentsTab() {
    this['Comments tab'].click();
  }
}
