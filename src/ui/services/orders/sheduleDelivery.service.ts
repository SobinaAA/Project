import { Page } from '@playwright/test';
import { SalesPortalPageService } from '../salesPortal.service';
import { SheduleDeluveryPage } from 'ui/pages/orders/ScheduleDelivery.page';

export class SheduleDeliveryService extends SalesPortalPageService {
  protected sheduleDeluveryPage: SheduleDeluveryPage;

  constructor(protected page: Page) {
    super(page);
    this.sheduleDeluveryPage = new SheduleDeluveryPage(page);
  }
}
