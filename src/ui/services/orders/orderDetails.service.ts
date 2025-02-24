import { expect as expectPW, Page } from '@playwright/test';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { EditOrderProductsModal } from 'ui/pages/orders/editProducts.modal';
import { EditOrderCustomerModal } from 'ui/pages/orders/editCustomer.modal';
import { NOTIFICATIONS } from 'data/notifications';
import { expect } from 'chai';
import { ORDER_STATUS } from 'data/orders/statuses';
import { ScheduleDeliveryPage } from 'ui/pages/orders/ScheduleDelivery.page';
import { CancelOrderModal } from 'ui/pages/orders/cancelOrder.modal';

export class OrderDetailsPageService extends SalesPortalPageService {
  protected ordersDetailsPage: OrdersDetailsPage;
  private editOrderProductsModal: EditOrderProductsModal;
  private editOrderCustomerModal: EditOrderCustomerModal;
  private cancelOrderModal: CancelOrderModal;
  private scheduleDeliveryPage: ScheduleDeliveryPage;

  constructor(protected page: Page) {
    super(page);
    this.ordersDetailsPage = new OrdersDetailsPage(page);
    this.editOrderProductsModal = new EditOrderProductsModal(page);
    this.editOrderCustomerModal = new EditOrderCustomerModal(page);
    this.cancelOrderModal = new CancelOrderModal(page);
    this.scheduleDeliveryPage = new ScheduleDeliveryPage(page);
  }

  async cancelOrder() {
    this.ordersDetailsPage.clickOnCancelOrderButton();
    this.cancelOrderModal.waitForOpened();
    this.cancelOrderModal.clickOnCancelOrderButton();
    this.ordersDetailsPage.waitForOpened();
  }

  async validateCancelOrderNotification() {
    const notificationText =
      await this.ordersDetailsPage.getLastNotificationText();
    expect(notificationText).to.equal(NOTIFICATIONS.ORDER_CANCELED);
  }

  async validateOrderStatus(status: ORDER_STATUS) {
    const actualStatus = await this.ordersDetailsPage.getStatus();
    expect(actualStatus).to.equal(status);
  }

  async deleteCommentByText(comment: string) {
    await this.ordersDetailsPage.clickOnDeleteComment(comment);
    await this.ordersDetailsPage.waitForSpinnersToHide();
  }

  async validateDeleteCommentNotification() {
    const notificationText =
      await this.ordersDetailsPage.getLastNotificationText();
    expect(notificationText).to.equal(NOTIFICATIONS.COMMENT_DELETED);
  }

  async checkErrorForComment() {
    const errorText =
      await this.ordersDetailsPage['Error Comment Area'].innerText();
    expectPW(errorText).toContain(NOTIFICATIONS.COMMENT_ERROR);
    expectPW(this.ordersDetailsPage['Create Comment Button']).toBeDisabled();
  }

  async checkCommentAbsence() {
    const arrayOfComments = await this.ordersDetailsPage.findElementArray(
      this.ordersDetailsPage['All comments']
    );
    const result = arrayOfComments.length;
    expectPW(result).toBe(0);
  }

  async makeComment(text: string) {
    await this.ordersDetailsPage.fillCommentInput(text);
    await this.ordersDetailsPage.clickOnCreateComment();
    await this.ordersDetailsPage.waitForSpinnersToHide();
  }

  async checkCommentPresence(text: string) {
    const arrayOfComments = await this.ordersDetailsPage.findElementArray(
      this.ordersDetailsPage['All comments']
    );
    const result = arrayOfComments.some(async (locator) => {
      const comText = await locator.innerText();
      return comText === text;
    });
    expectPW(result).toBeTruthy();
  }

  async validateAddCommentNotification() {
    const notificationText =
      await this.ordersDetailsPage.getLastNotificationText();
    expect(notificationText).to.equal(NOTIFICATIONS.COMMENT_POSTED);
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

  async openScheduleDelivery() {
    await this.ordersDetailsPage.openDeliveryTab();
    await this.ordersDetailsPage.clickOnScheduleDelivery();
    await this.scheduleDeliveryPage.waitForSpinnerToHide();
    await this.scheduleDeliveryPage.waitForOpened();
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

  async validateDeliveryWasSuccessfullyNotification() {
    const notificationText =
      await this.ordersDetailsPage.getLastNotificationText();
    expect(notificationText).to.equal(NOTIFICATIONS.DELIVERY_CREATE);
  }

  async verifyLastProductMatches(expectedProductName: string): Promise<void> {
    const actualProductName = await this.ordersDetailsPage.getLastProductName();
    expect(actualProductName).to.equal(expectedProductName);
  }

  async verifyDeliveryInHistory(
    expectedStatus: 'created' | 'changed'
  ): Promise<void> {
    await this.ordersDetailsPage.openHistoryTab();
    const actualStatus = await this.ordersDetailsPage.checkDeliveryStatus();
    expect(actualStatus).to.equal(expectedStatus);
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
