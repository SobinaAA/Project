import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from 'ui/pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from 'data/notifications.js';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { DeleteCustomerModal } from 'ui/pages/customers/deleteCustomer.modal';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { DetailsCustomerPage } from 'ui/pages/customers/detailsCustomer.page ';
import { titles } from 'data/titles';

export class CustomersListPageService extends SalesPortalPageService {
  protected customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private deleteCustomerModal: DeleteCustomerModal;
  private editCustomerPage: EditCustomerPage;
  private detailsCustomerPage: DetailsCustomerPage;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.deleteCustomerModal = new DeleteCustomerModal(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.detailsCustomerPage = new DetailsCustomerPage(page);
  }

  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  async validateCreateCustomerNotification() {
    const notificationText = await this.customersPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  }

  async checkMainContent() {
    await expect(this.customersPage['Main Content']).toHaveScreenshot();
  }

  async checkFilterContent() {
    await expect(this.customersPage['Filter Content']).toHaveScreenshot();
  }

  async checkUIModalDelete(n: number = 1) {
    const allDeleteButtons = await this.customersPage.findElementArray(
      this.customersPage['Delete Buttons']
    );
    if (!n) {
      const random =
        Math.floor((Math.random() * allDeleteButtons.length) / 20) + 1;
      await allDeleteButtons[random].scrollIntoViewIfNeeded();
      await allDeleteButtons[random].click();
    } else {
      await allDeleteButtons[n].scrollIntoViewIfNeeded();
      allDeleteButtons[n].click();
    }
    await this.deleteCustomerModal.waitForPageOpened();
    await expect(this.deleteCustomerModal['Modal Content']).toHaveScreenshot();
    await expect(this.deleteCustomerModal['Title']).toContainText(
      titles.delete
    );
  }

  async checkUIAddNewCustomerPage() {
    await expect(this.addNewCustomerPage['Main Content']).toHaveScreenshot();
    await expect(this.addNewCustomerPage['Title']).toContainText(titles.add);
  }

  async openEditRandomCustomer(n: number = 1) {
    const allEditButtons = await this.customersPage.findElementArray(
      this.customersPage['Edit Buttons']
    );
    if (!n) {
      const random =
        Math.floor((Math.random() * allEditButtons.length) / 20) + 1;
      await allEditButtons[random].scrollIntoViewIfNeeded();
      await allEditButtons[random].click();
    } else {
      await allEditButtons[n].scrollIntoViewIfNeeded();
      allEditButtons[n].click();
    }
  }

  //Need mock!
  async checkEditCustomerPage() {
    await expect(this.editCustomerPage['Main Content']).toHaveScreenshot();
    await expect(this.editCustomerPage['Title']).toContainText(titles.edit);
  }

  async openDetailsRandomCustomer(n: number = 1) {
    const allDetailsButtons = await this.customersPage.findElementArray(
      this.customersPage['Details Buttons']
    );
    if (!n) {
      const random =
        Math.floor((Math.random() * allDetailsButtons.length) / 20) + 1;
      await allDetailsButtons[random].scrollIntoViewIfNeeded();
      await allDetailsButtons[random].click();
    } else {
      await allDetailsButtons[n].scrollIntoViewIfNeeded();
      allDetailsButtons[n].click();
    }
  }

  //Need mock!
  async checkDetailsCustomerPage() {
    await expect(this.detailsCustomerPage['Main Content']).toHaveScreenshot();
    await expect(this.detailsCustomerPage['Title']).toContainText(
      titles.details
    );
  }
}
