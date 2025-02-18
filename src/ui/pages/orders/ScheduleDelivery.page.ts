import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class SheduleDeluveryPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Schedule Delivery"]';
  readonly 'Save Button' = this.findElement('#save-delivery');
  readonly 'Cancel Button' = this.findElement('#back-to-order-details-page');
}
