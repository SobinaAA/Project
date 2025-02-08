import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from 'ui/pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from 'data/notifications.js';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { DeleteCustomerModal } from 'ui/pages/customers/deleteCustomer.modal';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { DetailsCustomerPage } from 'ui/pages/customers/detailsCustomer.page ';
import { titles } from 'data/titles';
import {
  sortMethodCustomers,
  direction,
  ISort
} from 'data/types/sorting.types';

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
    this.editCustomerPage.waitForOpened();
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
    await this.detailsCustomerPage.waitForOpened();
  }

  //Need mock!
  async checkDetailsCustomerPage() {
    await expect(this.detailsCustomerPage['Main Content']).toHaveScreenshot();
    await expect(this.detailsCustomerPage['Title']).toContainText(
      titles.details
    );
  }

  async sortBy(method: sortMethodCustomers, dir: direction) {
    let actualSort = await this.customersPage.getSorting();
    const toDoSort: ISort = {
      field: method,
      direction: dir
    };
    await this.customersPage.waitUntil(
      async () => {
        if (
          toDoSort.field == actualSort.field &&
          toDoSort.direction == actualSort.direction
        ) {
          return true;
        }
        await this.customersPage.clickOnTableHeader(method);
        actualSort = await this.customersPage.getSorting();
        return false;
      },
      {
        timeout: 10000,
        timeoutMsg: `Could not set direction to ${dir} within the timeout.`
      }
    );
  }

  async checkSorting(field: sortMethodCustomers, dir: direction) {
    const table = (await this.customersPage.getCustomersTable()) as Record<
      string,
      string
    >[];
    let mySortedTable: Record<string, string>[] = [];
    switch (field) {
      case 'Name':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted((cust1, cust2) =>
                cust1['name'].localeCompare(cust2['name'])
              )
            : table.toSorted((cust1, cust2) =>
                cust2['name'].localeCompare(cust1['name'])
              );
        break;
      case 'Email':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted((cust1, cust2) =>
                cust1['email'].localeCompare(cust2['email'])
              )
            : table.toSorted((cust1, cust2) =>
                cust2['email'].localeCompare(cust1['email'])
              );
        break;
      case 'Country':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted((cust1, cust2) =>
                cust1['country'].localeCompare(cust2['country'])
              )
            : table.toSorted((cust1, cust2) =>
                cust2['country'].localeCompare(cust1['country'])
              );
        break;
      case 'Created On':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted(
                (cust1, cust2) =>
                  Date.parse(cust1['created on']) -
                  Date.parse(cust2['created on'])
              )
            : table.toSorted(
                (cust1, cust2) =>
                  Date.parse(cust2['created on']) -
                  Date.parse(cust1['created on'])
              );
        break;
      default:
        throw new Error('Другие методы пока не реализованы!');
    }
    const result = mySortedTable.every(
      (obj, i) => obj[field] === table[i][field]
    );
    console.log(result);
    expect(result).toBe(true);
  }
}
