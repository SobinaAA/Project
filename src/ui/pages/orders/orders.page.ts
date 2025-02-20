import { direction, ISort, sortMethodOrders } from 'data/types/sorting.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class OrdersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()[contains(.,"Orders List")]]';

  readonly 'Add New Order Button' = this.findElement(
    'button.page-title-header'
  );
  readonly 'Table row selector' = (orderNumber: string) =>
    this.findElement(`//tbody/tr[contains(., "${orderNumber}")]`);
  readonly ['Details button by table row'] = (orderNumber: string) =>
    this.findElement(
      this['Table row selector'](orderNumber).locator('button[title="Details"]')
    );
  readonly 'Filter Button' = this.findElement('#filter');

  readonly 'Main Content' = this.findElement('.bg-body:nth-child(2)');
  readonly 'Title Content' = this.findElement('.bg-body:nth-child(1)');
  readonly ['Details Buttons'] = '[title = "Details"]';
  readonly 'Sort Table Header' = (field: sortMethodOrders) =>
    this.findElement(`//div[contains(text(), "${field}")]`);
  readonly 'Sorted Field' = this.findElement('[current="true"]');
  readonly 'All Statuses in the Table' = 'tbody > tr > td:nth-child(6)';
  readonly 'Search input' = this.findElement('.search-bar input');
  readonly 'Search button' = this.findElement('button[type = "submit"]');
  readonly 'Empty Table' = this.findElement('td');

  async fillSearchInput(searchString: string) {
    await this['Search input'].waitFor({ state: 'attached' });
    await this['Search input'].click();
    await this.setValue(this['Search input'], searchString);
  }

  async clickOnSearchButton() {
    await this['Search button'].click();
  }

  async clickOnAddNewOrder() {
    await this.click(this['Add New Order Button']);
  }

  async openFilters() {
    await this.click(this['Filter Button']);
  }

  async clickOnDetailsButton(orderNumber: string) {
    await this.click(this['Details button by table row'](orderNumber));
  }

  async getOrderFromTable(orderIdentifier: string) {
    const row = this.page
      .locator('tbody tr', { hasText: orderIdentifier })
      .first();
    await this.waitForElement(row, 'visible');
    const cells = row.locator('td');
    const texts = await cells.allTextContents();
    const [orderNumber, customer, email, price, delivery, status, createdOn] =
      texts;
    return {
      orderNumber: orderNumber,
      customer: customer,
      email: email,
      price: price,
      delivery: delivery,
      status: status,
      createdOn: createdOn
    };
  }

  async clickOnTableHeader(field: sortMethodOrders) {
    await this.click(this['Sort Table Header'](field));
    await this.waitForOpened();
  }

  async getSorting() {
    const field = this['Sorted Field'];
    const sortDirection = await field.getAttribute('direction');
    const sortField = await this.getText(field);
    const objSort: ISort = {
      field: sortField as sortMethodOrders,
      direction: sortDirection as direction
    };
    return objSort;
  }

  async getOrdersTable() {
    return await this.page.evaluate(() => {
      const tableData: Record<string, string>[] = [];
      const rows = Array.from(
        document.querySelectorAll('#table-orders tbody tr')
      );
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td'));
        cells.pop();
        const cellsTexts = cells.map((td) => td.innerText);
        const rowObject = {
          'Order Number': cellsTexts[0],
          Name: cellsTexts[1],
          Email: cellsTexts[2],
          Price: cellsTexts[3].replace('$', ''),
          Delivery: cellsTexts[4],
          Status: cellsTexts[5],
          'Created on': cellsTexts[6]
        };
        tableData.push(rowObject);
      }
      return tableData;
    });
  }

  async getAllStatuses() {
    const statuses = await this.findElementArray(
      this['All Statuses in the Table']
    );
    return statuses;
  }
}
