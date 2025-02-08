import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from 'ui/pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { CustomerDetailsPage } from 'ui/pages/customers/customerDetails.page';
import { DeleteCustomerModal } from 'ui/pages/customers/deleteCustomer.modal';
import { ICustomerFromResponse } from 'data/types/customers.types';
import _ from 'lodash';
import { EMPTY_TABLE_MESSAGE } from 'data/table.data';
import { formatDateToDateAndTime } from 'utils/date/dates';

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private editCustomerPage: EditCustomerPage;
  private customerDetailsPage: CustomerDetailsPage;
  private deleteCustomerModal: DeleteCustomerModal;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.customerDetailsPage = new CustomerDetailsPage(page);
    this.deleteCustomerModal = new DeleteCustomerModal(page);
  }

  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  async openEditPage(email: string) {
    await this.customersPage.clickOnEditCustomer(email);
    await this.editCustomerPage.waitForOpened();
  }

  async openDetailsPage(email: string) {
    await this.customersPage.clickOnDetailsCustomer(email);
    await this.customerDetailsPage.waitForOpened();
  }

  async deleteCustomer(email: string) {
    await this.customersPage.clickOnDeleteCustomer(email);
    await this.deleteCustomerModal.waitForOpened();
    await this.deleteCustomerModal.clickOnYesButton();
  }

  async validateEmptyTableMessage() {
    const actual = await this.customersPage.getEmptyTableMessage();
    expect(actual).toBe(EMPTY_TABLE_MESSAGE);
  }

  async validateCustomerInTable(customer: ICustomerFromResponse) {
    const actual = await this.customersPage.getCustomerFromTable(
      customer.email
    );
    const expected = {
      ..._.pick(customer, ['email', 'name', 'country', 'createdOn']),
      createdOn: formatDateToDateAndTime(customer.createdOn)
    };
    expect(actual).toMatchObject(expected);
  }
}
