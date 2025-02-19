import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class OrdersDetailsPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Order Details"]';
  readonly 'Title Content' = this.findElement('#order-details-header');
  readonly 'Customer Section' = this.findElement('#customer-section');
  readonly 'Edit Customer Button' = this.findElement(
    '#customer-section button'
  );
  readonly 'Products Section' = this.findElement('#products-section');
  readonly 'Edit Products Button' = this.findElement(
    '#products-section button'
  );
  readonly 'Tabs' = this.findElement('#order-details-tabs-section');
  readonly 'Delivery tab' = this.findElement('[aria-controls="delivery"]');
  readonly 'History tab' = this.findElement('[aria-controls="history"]');
  readonly 'Comments tab' = this.findElement('[aria-controls="comments"]');

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
