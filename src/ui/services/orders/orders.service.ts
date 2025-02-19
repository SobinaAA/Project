import { Page } from '@playwright/test';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { SalesPortalPageService } from 'ui/services/salesPortal.service';
import { AddNewOrderModal } from 'ui/pages/orders/addNewOrder.modal';
import { OrdersListPage } from 'ui/pages/orders/orders.page';
import { IOrderData } from 'data/types/orders.types';
import { expect } from 'chai';
import _ from 'lodash';

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

  async openDetailsOrder(customerName: string) {
    await this.ordersPage.clickOnDetailsButton(customerName)
    await this.ordersDetailsPage.waitForSpinnersToHide();
    await this.ordersDetailsPage.waitForOpened();
  }

  async getOrderId(customerName: string) {
    const orderData = await this.ordersPage.getOrderFromTable(customerName);
    return orderData.orderNumber;
  }

  async createOrder(order: IOrderData): Promise<void> {
    await this.openAddNewOrderModal();
    await this.addNewOrderModal.selectCustomer(order.customer);
    for (let i = 0; i < order.products.length; i++) {
      if (i > 0) {
        await this.addNewOrderModal.clickOnAddProductButton();
      }
      await this.addNewOrderModal.selectProductByName(order.products[i], i);
    }
    await this.addNewOrderModal.clickOnCreateButton();
  }

  async checkOrderInTable(order: IOrderData) {
    const actualOrderData = await this.ordersPage.getOrderFromTable(order.customer);
    const actualDataToCompare = _.pick(actualOrderData, ['customer', 'status']);
    const expectedOrderData = {
      customer: order.customer,
      status: 'Draft'
    };
    expect(actualDataToCompare).to.deep.equal(expectedOrderData);
  }
}

