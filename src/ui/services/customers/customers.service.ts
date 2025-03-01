import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from 'ui/pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { DeleteCustomerModal } from 'ui/pages/customers/deleteCustomer.modal';
import { EditCustomerPage } from 'ui/pages/customers/editCustomer.page';
import { titles } from 'data/titles';
import {
  sortMethodCustomers,
  direction,
  ISort
} from 'data/types/sorting.types';
import { COUNTRIES } from 'data/customers/countries';
import { FilterModal } from 'ui/pages/products/filterModal.page';
import { ICustomer, ICustomerFromResponse } from 'data/types/customers.types';
import _ from 'lodash';
import { EMPTY_TABLE_MESSAGE } from 'data/table.data';
import { formatDateToDateAndTime } from 'utils/date/dates';
import { DetailsCustomerPage } from 'ui/pages/customers/customerDetails.page';

export class CustomersListPageService extends SalesPortalPageService {
  protected customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private deleteCustomerModal: DeleteCustomerModal;
  private editCustomerPage: EditCustomerPage;
  private detailsCustomerPage: DetailsCustomerPage;
  private filterModal: FilterModal;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.deleteCustomerModal = new DeleteCustomerModal(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.detailsCustomerPage = new DetailsCustomerPage(page);
    this.filterModal = new FilterModal(page);
    this.editCustomerPage = new EditCustomerPage(page);
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
    await this.detailsCustomerPage.waitForOpened();
  }

  async openDeleteCustomerModal(email: string) {
    await this.customersPage.clickOnDeleteCustomer(email);
    await this.deleteCustomerModal.waitForSpinnerToHide();
  }

  async deleteCustomer(email: string) {
    await this.openDeleteCustomerModal(email);
    await this.deleteCustomerModal.clickOnDeleteButton();
    await this.customersPage.checkForCustomerAbsence(email);
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

  async checkCustomerInTable(customer: ICustomer) {
    const actualCustomerData = await this.customersPage.getCustomerFromTable(
      customer.email
    );

    expect(_.pick(actualCustomerData, ['email', 'name', 'country'])).toEqual({
      email: customer.email,
      name: customer.name,
      country: customer.country
    });
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
    console.log(table);
    let mySortedTable: Record<string, string>[] = [];
    switch (field) {
      case 'Name':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted((a, b) => a['name'].localeCompare(b['name']))
            : table.toSorted((a, b) => b['name'].localeCompare(a['name']));
        break;
      case 'Email':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted((a, b) => a['email'].localeCompare(b['email']))
            : table.toSorted((a, b) => b['email'].localeCompare(a['email']));
        break;
      case 'Country':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted((a, b) => a['country'].localeCompare(b['country']))
            : table.toSorted((a, b) =>
                b['country'].localeCompare(a['country'])
              );
        break;
      case 'Created On':
        mySortedTable =
          dir === 'asc'
            ? table.toSorted(
                (el1, el2) =>
                  Date.parse(el1['created On']) - Date.parse(el2['created On'])
              )
            : table.toSorted(
                (el1, el2) =>
                  Date.parse(el2['created On']) - Date.parse(el1['created On'])
              );
        break;
      default:
        throw new Error('Другие методы пока не реализованы!');
    }

    const key = field.toLocaleLowerCase();
    const result = mySortedTable.every((obj, i) => {
      return obj[key] === table[i][key];
    });
    expect(result).toBe(true);
  }

  async filterCustomersByCountry(country: COUNTRIES) {
    await this.customersPage.openFilters();
    await this.filterModal.chooseCountry(country);
    await this.filterModal.submitFilters();
    await this.customersPage.waitForOpened();
  }

  async checkFilterByCountry(country: COUNTRIES) {
    const actualCountries = await this.customersPage.getAllCountries();
    const allFiltred = actualCountries.every(async (elem) => {
      const actual = await elem.innerText();
      return actual === country;
    });
    expect(allFiltred).toBeTruthy();
  }
}
