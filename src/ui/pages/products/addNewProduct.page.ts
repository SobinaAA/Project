import { IProduct } from 'data/types/product.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class AddNewProductPage extends SalesPortalPage {
  readonly uniqueElement = '//button[contains(text(), "Add Product")]';
  readonly 'Name input' = '#inputName';
  readonly 'Price input' = '#inputPrise';
  readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
  readonly 'Amount input' = '#inputAmount';
  readonly 'Notes input' = '#textareaNotes';
  readonly 'Save New Product button' = '#save-new-product';
  readonly 'Clear all button' = '#clear-inputs';

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
