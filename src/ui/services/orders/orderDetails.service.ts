import { expect, Page } from '@playwright/test';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';

export class OrderDetailsPageService extends SalesPortalPageService {
  protected ordersDetailsPage: OrdersDetailsPage;
  //private editOrderProductsModal: EditOrderProductsModal;
  //private editOrderCustomerModal: EditOrderCustomerModal;

  constructor(protected page: Page) {
    super(page);
    this.ordersDetailsPage = new OrdersDetailsPage(page);
    //this.editOrderProductsModal = new EditOrderProductsModal(page);
    //this.editOrderCustomerModal = new EditOrderCustomerModal(page);
  }

  async checkDetailsPage() {
    await expect(this.ordersDetailsPage['Title Content']).toHaveScreenshot(
      'Details.png',
      { maxDiffPixels: 20 }
    );
    await expect(this.ordersDetailsPage['Products Section']).toHaveScreenshot(
      'Products Section.png',
      { maxDiffPixels: 20 }
    );
    await expect(this.ordersDetailsPage['Customer Section']).toHaveScreenshot(
      'Customer Section.png',
      { maxDiffPixels: 20 }
    );
    await this.ordersDetailsPage.openDeliveryTab();
    await expect(this.ordersDetailsPage['Tabs']).toHaveScreenshot(
      'Delivery.png',
      { maxDiffPixels: 20 }
    );
    await this.ordersDetailsPage.openHistoryTab();
    await expect(this.ordersDetailsPage['Tabs']).toHaveScreenshot(
      'History.png',
      { maxDiffPixels: 20 }
    );
    await this.ordersDetailsPage.openCommentsTab();
    await expect(this.ordersDetailsPage['Tabs']).toHaveScreenshot(
      'Comments.png',
      { maxDiffPixels: 20 }
    );
  }
}
