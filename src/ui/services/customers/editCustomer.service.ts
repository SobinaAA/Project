import { Page } from '@playwright/test';
import { ICustomer } from 'data/types/customers.types';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { CustomersListPage } from 'ui/pages/customers/customers.page';
import { generateNewCustomer } from 'data/customers/generateCustomer';
import { DeleteCustomerModal } from 'ui/pages/customers/deleteCustomer.modal';

export class EditCustomerPageService {
  private customersPage: CustomersListPage;
  private editCustomerPage: EditCustomerPage;
  private deleteCustomerModal: DeleteCustomerModal;

  constructor(protected page: Page) {
    this.customersPage = new CustomersListPage(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.deleteCustomerModal = new DeleteCustomerModal(page);
  }

  async fillCustomerInputs(customer: Partial<ICustomer>) {
    await this.editCustomerPage.fillInputsForEdit(customer);
  }

  async saveChanges() {
    await this.editCustomerPage.clickOnSaveButton();
    await this.editCustomerPage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }

  async updateCustomer(customer?: ICustomer) {
    const customerData = customer ?? generateNewCustomer();
    await this.fillCustomerInputs(customerData);
    await this.saveChanges();
  }

  async openCustomers() {
    await this.editCustomerPage.clickOnBackToCustomersButton();
    await this.customersPage.waitForOpened();
  }

  async deleteCustomer() {
    await this.editCustomerPage.clickOnDeleteCustomerButton();
    await this.deleteCustomerModal.waitForOpened();
    await this.deleteCustomerModal.clickOnYesButton();
    await this.editCustomerPage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }
}
