import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import { IProduct } from 'data/types/product.types';
import { expect } from '@playwright/test';

export class DetailsProductModal extends SalesPortalPage {
  readonly uniqueElement = '#details-modal-container';
  readonly ['Main Content'] = this.findElement('.modal-body');
  readonly ['Title'] = this.findElement('.modal-header');
  readonly ['Footer'] = this.findElement('.modal-footer');
  readonly ['Edit Product'] = this.findElement('.mr-10');
  readonly ['Cansel'] = this.findElement('.btn-secondary');
  readonly ['Cross'] = this.findElement('.btn-close');
  readonly 'Modal container' = '//div[@id="details-modal-container"]';
  readonly 'Edit Product button' = `${this['Modal container']}//button[contains(@class, "btn-primary")]`;
  readonly 'Cancel button' = `${this['Modal container']}//button[normalize-space(.)="Cancel"]`;
  readonly 'Product Details' = `${this['Modal container']}//*[@class="details mb-3"]`;
  readonly 'Product Name in Details' = `${this['Product Details']}[1]//p[@class="ms-4"]`;
  readonly 'Product Amount in Details' = `${this['Product Details']}[2]//p[@class="ms-4"]`;
  readonly 'Product Price in Details' = `${this['Product Details']}[3]//p[@class="ms-4"]`;
  readonly 'Product Manufacturer in Details' = `${this['Product Details']}[4]//p[@class="ms-4"]`;
  readonly 'Product Notes in Details' = `${this['Product Details']}[6]//p[@class="ms-4"]`;

  async getTitleText(): Promise<string> {
    return await this.getText(this['Title']);
  }

  async clickOnEditButton() {
    await this.click(this['Edit Product button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async getProductDataInDetails() {
    const [name, amount, price, manufacturer, notes] = await Promise.all([
      this.getText(this['Product Name in Details']),
      this.getText(this['Product Amount in Details']).then(Number),
      this.getText(this['Product Price in Details']).then(Number),
      this.getText(this['Product Manufacturer in Details']),
      this.getText(this['Product Notes in Details'])
    ]);
    return { name, amount, price, manufacturer, notes };
  }

  async verifyProductDetails(expectedProduct: IProduct): Promise<void> {
    const actual = await this.getProductDataInDetails();
    const expectedData = {
      name: expectedProduct.name,
      amount: expectedProduct.amount,
      price: Number(expectedProduct.price),
      manufacturer: expectedProduct.manufacturer,
      notes: expectedProduct.notes
    };
    expect(actual).toEqual(expectedData);
  }
}
