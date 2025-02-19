import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import { IProduct } from 'data/types/product.types';

export class EditProductPage extends SalesPortalPage {
  readonly uniqueElement = '#edit-product-container';
  readonly ['Main Content'] = this.findElement('.mb-5');
  readonly ['Title'] = this.findElement('.page-title-text');
  readonly ['Name input'] = '#inputName';
  readonly ['Price input'] = '#inputPrice';
  readonly ['Manufacturer dropdown'] = 'select#inputManufacturer';
  readonly ['Amount input'] = '#inputAmount';
  readonly ['Notes textarea'] = '#textareaNotes';
  readonly ['Save Changes Button'] = this.findElement('#save-product-changes');
  readonly ['Delete Product Button'] = this.findElement('#delete-product-btn');
  readonly ['Back to Products Button'] = this.findElement('.back-link');

  async fillInputsForEdit(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.price && (await this.setValue(this['Price input'], product.price));
    product.manufacturer &&
      (await this.selectDropdownValue(
        this['Manufacturer dropdown'],
        product.manufacturer
      ));
    product.amount &&
      (await this.setValue(this['Amount input'], product.amount));
    product.notes &&
      (await this.setValue(this['Notes textarea'], product.notes));
  }

  async clickOnSaveButton() {
    await this.click(this['Save Changes button']);
  }

  async clickOnBackToProductsButton() {
    await this.click(this['Back to Products Button']);
  }

  async clickOnDeleteProductButton() {
    await this.click(this['Delete Product Button']);
  }

  async isSaveButtonDisabled(): Promise<boolean> {
    const button = this.findElement(this['Save button']);
    const disabledAttr = await button.getAttribute('disabled');
    return disabledAttr !== null;
  }
}
