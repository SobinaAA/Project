import {
  direction,
  ISort,
  sortMethodCustomers
} from 'data/types/sorting.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  readonly 'Add New Customer button' = 'button.page-title-header';
  readonly 'Edit button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Edit"]`;
  readonly 'Details button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Details"]`;
  readonly 'Delete button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Delete"]`;
  readonly 'Empty table message' = 'td.fs-italic';
  readonly 'Customer Table Row by email' = (email: string) =>
    this.findElement(`tbody tr`).filter({ hasText: email });
  readonly 'Table row selector' = (customer: string) =>
    `//tr[./td[normalize-space(.)="${customer}"]]`;
  readonly 'Main Content' = this.findElement('.bg-body:nth-child(2)');
  readonly 'Filter Content' = this.findElement('.bg-body:first-child');
  readonly 'Delete Buttons' = this.findElement('[title="Delete"]');
  readonly 'Edit Buttons' = this.findElement('[title="Edit"]');
  readonly 'Details Buttons' = this.findElement('[title="Details"]');
  readonly 'Sort Table Header' = (field: sortMethodCustomers) =>
    this.findElement(`//div[contains(text(),'${field}')]`);
  readonly 'Sorted Field' = this.findElement('[current="true"]');
  readonly 'Filter Button' = '#filter';
  readonly 'All Countries in the Table' = 'tbody > tr > td:nth-child(3)';
  readonly 'Customer Row' = (customerEmail: string) =>
    this.findElement(`tbody tr:has-text("${customerEmail}")`);

  async clickOnAddNewCustomer() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this['Edit button by table row'](customerName));
  }

  async clickOnDetailsCustomer(customerName: string) {
    await this.click(this['Details button by table row'](customerName));
  }

  async clickOnDeleteCustomer(customerName: string) {
    await this.click(this['Delete button by table row'](customerName));
  }

  async getEmptyTableMessage() {
    return this.getText(this['Empty table message']);
  }

  async getCustomerFromTable(customerEmail: string) {
    const [email, name, country, createdOn] = await Promise.all(
      (
        await this['Customer Table Row by email'](customerEmail)
          .locator('td')
          .all()
      ).map((td) => this.getText(td))
    );
    return { email, name, country, createdOn };
  }

  async clickOnTableHeader(field: sortMethodCustomers) {
    await this.click(this['Sort Table Header'](field));
    await this.waitForOpened();
  }

  async getSorting() {
    const field = this['Sorted Field'];
    const sortDirection = await field.getAttribute('direction');
    const sortField = await this.getText(field);
    const objSort: ISort = {
      field: sortField as sortMethodCustomers,
      direction: sortDirection as direction
    };
    return objSort;
  }

  async getCustomersTable() {
    return await this.page.evaluate(() => {
      const tableData: Record<string, string>[] = [];
      const rows = Array.from(
        document.querySelectorAll('#table-customers tbody tr')
      );
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td'));
        cells.pop();
        const cellsTexts = cells.map((td) => td.innerText);
        const rowObject = {
          email: cellsTexts[0],
          name: cellsTexts[1],
          country: cellsTexts[2],
          'created on': cellsTexts[3]
        };
        tableData.push(rowObject);
      }
      return tableData;
    });
  }

  async openFilters() {
    await this.click(this['Filter Button']);
  }

  async getAllCountries() {
    const countries = await this.findElementArray(
      this['All Countries in the Table']
    );
    return countries;
  }

  async checkForCustomerAbsence(customerEmail: string): Promise<void> {
    await this.waitForElement(this['Customer Row'](customerEmail), 'hidden');
  }
}
