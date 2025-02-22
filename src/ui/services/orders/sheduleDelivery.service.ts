import { Page } from '@playwright/test';
import { SalesPortalPageService } from 'ui/services/salesPortal.service';
import { ScheduleDeliveryPage } from 'ui/pages/orders/ScheduleDelivery.page';
import { IDelivery } from 'data/types/orders.types';
import { generateDelivery } from 'utils/order/generateDelivery';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';

export class ScheduleDeliveryService extends SalesPortalPageService {
  protected scheduleDeliveryPage: ScheduleDeliveryPage;
  private ordersDetailsPage: OrdersDetailsPage;

  constructor(protected page: Page) {
    super(page);
    this.scheduleDeliveryPage = new ScheduleDeliveryPage(page);
    this.ordersDetailsPage = new OrdersDetailsPage(page);
  }

  async createDelivery(delivery?: IDelivery) {
    const deliveryData = delivery ?? generateDelivery();
    await this.scheduleDeliveryPage.fillInputs(deliveryData);
    await this.scheduleDeliveryPage.clickOnSaveButton();
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
  }

  async updateDelivery(delivery?: IDelivery) {
    const deliveryData = delivery ?? generateDelivery();
    console.log('New delivery data:', deliveryData);
    await this.scheduleDeliveryPage.fillInputs(deliveryData);
    await this.scheduleDeliveryPage.clickOnSaveButton();
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
  }
}
