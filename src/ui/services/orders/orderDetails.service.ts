import { expect as expectPW, Page } from '@playwright/test';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { EditOrderProductsModal } from 'ui/pages/orders/editProducts.modal';
import { EditOrderCustomerModal } from 'ui/pages/orders/editCustomer.modal';
import { NOTIFICATIONS } from 'data/notifications';
import { expect } from 'chai';

export class OrderDetailsPageService extends SalesPortalPageService {
  protected ordersDetailsPage: OrdersDetailsPage;
  private editOrderProductsModal: EditOrderProductsModal;
  private editOrderCustomerModal: EditOrderCustomerModal;

  constructor(protected page: Page) {
    super(page);
    this.ordersDetailsPage = new OrdersDetailsPage(page);
    this.editOrderProductsModal = new EditOrderProductsModal(page);
    this.editOrderCustomerModal = new EditOrderCustomerModal(page);
  }

  async openEditCustomerModal() {
    await this.ordersDetailsPage.clickOnEditCustomer();
    await this.editOrderCustomerModal.waitForSpinnerToHide();
    await this.editOrderCustomerModal.waitForOpened();
  }

  async openEditProductsModal() {
    await this.ordersDetailsPage.clickOnEditProducts();
    await this.editOrderProductsModal.waitForSpinnerToHide();
    await this.editOrderProductsModal.waitForOpened();
  }

  async deleteOrderProduct(productName: string) {
    await this.openEditProductsModal();
    await this.editOrderProductsModal.deleteOrderProductByName(productName);
    await this.editOrderProductsModal.clickOnSaveButton();
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
    await this.ordersDetailsPage.checkProductNotPresent(productName);
  }

  async addNewProductOrder(productName: string) {
    await this.openEditProductsModal();
    await this.editOrderProductsModal.clickOnAddNewProductButton();
    await this.editOrderProductsModal.updateLastAddedProduct(productName);
    await this.editOrderProductsModal.clickOnSaveButton();
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
  }

  async updateProductOrder(productName: string) {
    await this.openEditProductsModal();
    await this.editOrderProductsModal.updateLastAddedProduct(productName);
    await this.editOrderProductsModal.clickOnSaveButton();
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
  }

  async updateOrderCustomer(customerName: string) {
    await this.openEditCustomerModal();
    await this.editOrderCustomerModal.selectCustomerByName(customerName);
    await this.editOrderCustomerModal.clickOnSaveButton();
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
  }

  async getCustomerName(): Promise<string> {
    return await this.ordersDetailsPage.getCustomerNameFromDetails();
  }

  async validateUpdateNotification() {
    const notificationText =
      await this.ordersDetailsPage.getLastNotificationText();
    expect(notificationText).to.equal(NOTIFICATIONS.ORDER_UPDATE);
  }

  async verifyLastProductMatches(expectedProductName: string): Promise<void> {
    const actualProductName = await this.ordersDetailsPage.getLastProductName();
    expect(actualProductName).to.equal(expectedProductName);
  }

  async checkDetailsPage() {
    await expectPW(this.ordersDetailsPage['Title Content']).toHaveScreenshot(
      'Details.png',
      { maxDiffPixels: 20 }
    );
    await expectPW(this.ordersDetailsPage['Products Section']).toHaveScreenshot(
      'Products Section.png',
      { maxDiffPixels: 20 }
    );
    await expectPW(this.ordersDetailsPage['Customer Section']).toHaveScreenshot(
      'Customer Section.png',
      { maxDiffPixels: 20 }
    );
    await this.ordersDetailsPage.openDeliveryTab();
    await expectPW(this.ordersDetailsPage['Tabs']).toHaveScreenshot(
      'Delivery.png',
      { maxDiffPixels: 20 }
    );
    await this.ordersDetailsPage.openHistoryTab();
    await expectPW(this.ordersDetailsPage['Tabs']).toHaveScreenshot(
      'History.png',
      { maxDiffPixels: 20 }
    );
    await this.ordersDetailsPage.openCommentsTab();
    await expectPW(this.ordersDetailsPage['Tabs']).toHaveScreenshot(
      'Comments.png',
      { maxDiffPixels: 20 }
    );
  }
}
