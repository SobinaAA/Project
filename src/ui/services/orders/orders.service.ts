import { Page } from '@playwright/test';
import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
import { SalesPortalPageService } from 'ui/services/salesPortal.service';
import { AddNewOrderModal } from 'ui/pages/orders/addNewOrder.modal';
import { OrdersListPage } from 'ui/pages/orders/orders.page';
import { IOrderData } from 'data/types/orders.types';
import { expect } from 'chai';
import { expect as expect_PW } from '@playwright/test';
import _ from 'lodash';
import { FilterOrdersModal } from 'ui/pages/orders/filterModal.page';

export class OrdersListPageService extends SalesPortalPageService {
  protected ordersPage: OrdersListPage;
  private addNewOrderModal: AddNewOrderModal;
  protected ordersDetailsPage: OrdersDetailsPage;
  protected filterModal: FilterOrdersModal;

  constructor(protected page: Page) {
    super(page);
    this.ordersDetailsPage = new OrdersDetailsPage(page);
    this.ordersPage = new OrdersListPage(page);
    this.addNewOrderModal = new AddNewOrderModal(page);
    this.filterModal = new FilterOrdersModal(page);
  }
  async openAddNewOrderModal() {
    await this.ordersPage.clickOnAddNewOrder();
    await this.addNewOrderModal.waitForSpinnerToHide();
    await this.addNewOrderModal.waitForOpened();
  }

  async openDetailsOrder(customerName: string) {
    await this.ordersPage.clickOnDetailsButton(customerName);
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
    const actualOrderData = await this.ordersPage.getOrderFromTable(
      order.customer
    );
    const actualDataToCompare = _.pick(actualOrderData, ['customer', 'status']);
    const expectedOrderData = {
      customer: order.customer,
      status: 'Draft'
    };
    expect(actualDataToCompare).to.deep.equal(expectedOrderData);
  }

  async openDetailsRandomCustomer(n: number = 1) {
    const allDetailsButtons = await this.ordersPage.findElementArray(
      this.ordersPage['Details Buttons']
    );
    if (!n) {
      const random = Math.floor(Math.random() * allDetailsButtons.length) + 1;
      await allDetailsButtons[random].scrollIntoViewIfNeeded();
      await allDetailsButtons[random].click();
    } else {
      await allDetailsButtons[n].scrollIntoViewIfNeeded();
      allDetailsButtons[n].click();
    }
    await this.ordersDetailsPage.waitForOpened();
  }

  async checkAddNewOrderModal() {
    expect_PW(this.addNewOrderModal['Modal Content']).toHaveScreenshot(
      'Create Order modal.png'
    );
    const actualTitle = await this.addNewOrderModal.getTitleText();
    expect_PW(actualTitle).toContain('Create Order');
  }

  async openFiltersModal() {
    await this.ordersPage['Filter Button'].click();
    this.filterModal.waitForOpened();
  }

  async checkFilterModal() {
    expect_PW(this.addNewOrderModal['Modal Content']).toHaveScreenshot(
      'Filters.png'
    );
    const actualTitle = await this.filterModal.getTitleText();
    expect_PW(actualTitle).toContain('Filters');
  }
}
