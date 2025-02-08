import { expect, Page } from '@playwright/test';
import { ICustomerFromResponse } from 'data/types/customers.types';
import _ from 'lodash';
import { CustomerDetailsPage } from 'ui/pages/customers/customerDetails.page';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { formatDateToDateAndTime } from 'utils/date/dates';

export class CustomersDetailsPageService {
  private customersPage: CustomersListPage;
  private editCustomerPage: EditCustomerPage;
  private customerDetailsPage: CustomerDetailsPage;

  constructor(protected page: Page) {
    this.customersPage = new CustomersListPage(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.customerDetailsPage = new CustomerDetailsPage(page);
  }

  async backToCustomers() {
    await this.customerDetailsPage.clickOnBackToCustomers();
    await this.customersPage.waitForOpened();
  }

  async openEditPage() {
    await this.customerDetailsPage.clickOnEditCustomerDetails();
    await this.editCustomerPage.waitForOpened();
  }

  async openOrderDetailsPage(orderId: string) {
    await this.customerDetailsPage.clickOnOrderNumberId(orderId);
  }

  //TODO: Реализовать после страницы ордеров
  //   async validateOrderData(orderId: string) {
  //     const actual = await this.customerDetailsPage.getOrderFromTable(orderId);
  //   }

  async validateCustomerData(customer: ICustomerFromResponse) {
    const actual = await this.customerDetailsPage.getCustomerDetails();
    const expected = {
      ..._.omit(customer, '_id'),
      createdOn: formatDateToDateAndTime(customer.createdOn)
    };
    expect(actual).toMatchObject(expected);
  }
}
