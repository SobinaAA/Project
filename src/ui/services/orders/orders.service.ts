import { Page } from '@playwright/test';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { SalesPortalPageService } from '../salesPortal.service';
import { AddNewOrderModal } from 'ui/pages/orders/addNewOrder.modal';
import { OrdersListPage } from 'ui/pages/orders/orders.page';

export class OrdersListPageService extends SalesPortalPageService {
  protected ordersPage: OrdersListPage;
  private addNewOrderModal: AddNewOrderModal;
  protected ordersDetailsPage: OrdersDetailsPage;

  constructor(protected page: Page) {
    super(page);
    this.ordersDetailsPage = new OrdersDetailsPage(page);
    this.ordersPage = new OrdersListPage(page);
    this.addNewOrderModal = new AddNewOrderModal(page);
  }
  async openAddNewOrderModal() {
    await this.ordersPage.clickOnAddNewOrder();
    await this.addNewOrderModal.waitForSpinnerToHide();
    await this.addNewOrderModal.waitForOpened();
  }
}
