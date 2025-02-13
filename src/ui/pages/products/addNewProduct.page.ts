import { IProduct } from 'data/types/product.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class AddNewProductPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';
  readonly 'Main Content' = this.findElement('.bg-body');
  readonly 'Name input' = this.findElement('#inputName');
  readonly 'Price input' = this.findElement('#inputPrise');
  readonly 'Manufacturer dropdown' = this.findElement(
    'select#inputManufacturer'
  );
  readonly 'Amount input' = this.findElement('#inputAmount');
  readonly 'Notes input' = this.findElement('#textareaNotes');
  readonly 'Save New Product button' = this.findElement('#save-new-product');
  readonly 'Clear all button' = this.findElement('#clear-inputs');

  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.price && (await this.setValue(this['Price input'], product.price));
    product.manufacturer &&
      (await this.selectDropdownValue(
        this['Manufacturer dropdown'],
        product.manufacturer
      ));
    product.amount &&
      (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes input'], product.notes));
  }

  async clickOnSaveButton() {
    await this.click(this['Save New Product button']);
  }

  async clickOnClearAllButton() {
    await this.click(this['Clear all button']);
  }
}
