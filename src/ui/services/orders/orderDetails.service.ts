import { Page } from '@playwright/test';
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
}
