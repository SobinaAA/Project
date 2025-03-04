import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class ProductsListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Products List "]';
  readonly 'Main Content' = this.findElement('.mb-5.bg-body');
  readonly 'Title Content' = this.findElement('.bg-body:first-child');
  readonly 'Delete Buttons' = this.findElement('[title="Delete"]');
  readonly 'Edit Buttons' = this.findElement('[title="Edit"]');
  readonly 'Details Buttons' = this.findElement('[title="Details"]');
  readonly 'Table row selector' = (productName: string) =>
    `//tbody/tr[contains(., "${productName}")]`;
  readonly 'Table' = this.findElement('#table-products');
  readonly 'Add New Product button' = 'button.page-title-button';
  readonly 'Edit button by table row' = (productName: string) =>
    `${this['Table row selector'](productName)}//button[@title="Edit"]`;
  readonly 'Details button by table row' = (productName: string) =>
    `${this['Table row selector'](productName)}//button[@title="Details"]`;
  readonly 'Delete button by table row' = (productName: string) =>
    `${this['Table row selector'](productName)}//button[@title="Delete"]`;
  readonly 'Products Table Row by name' = (name: string) =>
    this.findElement(`tbody tr`).filter({ hasText: name });
  readonly 'Table Header' = (
    field: 'Name' | 'Price' | 'Manufacturer' | 'Created On'
  ) => this.findElement(`//div[.="${field}"]`);
  readonly 'Table Headers section' = this.findElement('thead');

  async clickOnAddNewProduct() {
    await this.click(this['Add New Product button']);
  }

  async clickOnEditProduct(productName: string) {
    await this.click(this['Edit button by table row'](productName));
  }

  async clickOnDeleteProduct(productName: string) {
    await this.click(this['Delete button by table row'](productName));
  }

  async clickOnDetailsProduct(productName: string) {
    await this.click(this['Details button by table row'](productName));
  }

  async getProductFromTable(productName: string) {
    const row = this.page.locator('tbody tr', { hasText: productName }).first();
    await row.waitFor({ state: 'visible' });
    const cells = row.locator('td');
    const texts = await cells.allTextContents();
    const [name, price, manufacturer, createdOn] = texts;

    return { name, price, manufacturer, createdOn };
  }

  async checkForProductAbsence(productName: string): Promise<void> {
    await this.waitForElement(this['Products Table Row by name'](productName), 'hidden');
  }

  async clickOnTableHeader(
    field: 'Name' | 'Price' | 'Manufacturer' | 'Created On'
  ) {
    return this.click(this['Table Header'](field));
  }
}

