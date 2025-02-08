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
  readonly 'Empty table message' = 'td.fs-italic';
  readonly 'Customer Table Row by email' = (email: string) =>
    this.findElement(`tbody tr`).filter({ hasText: email });
  readonly 'Main Content' = this.findElement('.bg-body:nth-child(2)');
  readonly 'Filter Content' = this.findElement('.bg-body:first-child');
  readonly 'Delete Buttons' = this.findElement('[title="Delete"]');
  readonly 'Edit Buttons' = this.findElement('[title="Edit"]');
  readonly 'Details Buttons' = this.findElement('[title="Details"]');
  readonly 'Sort Table Header' = (field: sortMethodCustomers) =>
    this.findElement(`//div[contains(text(),'${field}')]`);
  readonly 'Sorted Field' = this.findElement('[current="true"]');

  async clickOnAddNewCustomer() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this['Edit button by table row'](customerName));
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
          name: cellsTexts[0],
          email: cellsTexts[1],
          country: cellsTexts[2],
          'created on': cellsTexts[3]
        };
        tableData.push(rowObject);
      }
      return tableData;
    });
  }

  // async getCustomersTable() {
  //   const tableData: Record<string, string>[] = [];
  //   const rows = await this.page.locator('#table-customers tbody tr').all();
  //   for (const row of rows) {
  //     const cells = await row.locator('td').all()
  //     cells.pop();
  //     //console.log(`Обрабатываем строку с ${cells.length} ячейками`);
  //     const cellsText: string[] = [];
  //     for (const cell of cells) {
  //       const text = await this.getText(cell, 5000);
  //       cellsText.push(text);
  //     }
  //     const rowObject = this.tHeaders.reduce((obj, header, i) => {
  //       obj[header] = cellsText[i];
  //       return obj;
  //     }, {} as Record<string, string>);
  //     tableData.push(rowObject);
  //   }

  //   return tableData;
  // }
}
