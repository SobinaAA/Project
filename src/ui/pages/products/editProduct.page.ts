import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import { IProduct } from 'data/types/product.types';

export class EditProductPage extends SalesPortalPage {
  readonly uniqueElement = '#edit-product-container';
  readonly ['Main Content'] = this.findElement('.mb-5');
  readonly ['Title'] = this.findElement('.page-title-text');
  readonly ['Save Changes Button'] = this.findElement('#save-product-changes');
  readonly ['Delete Product Button'] = this.findElement('#delete-product-btn');
  readonly ['Back to Products Button'] = this.findElement('.back-link');
  readonly 'Name input' = '#inputName';
  readonly 'Price input' = '#inputPrice';
  readonly 'Amount input' = '#inputAmount';
  readonly 'Notes input' = '#textareaNotes';
  readonly 'Manufacturer dropdown' = '#inputManufacturer';
  readonly 'Save button' = '#save-product-changes';
  readonly 'Delete button' = '#delete-product-btn';

  async clickOnSaveChangesButton() {
    await this.click(this['Save button']);
  }

  async clickOnDeleteButton() {
    await this.click(this['Delete button']);
  }

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async updateProductFields(product: Partial<IProduct>) {
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

  async isSaveButtonDisabled(): Promise<boolean> {
    const button = this.findElement(this['Save button']);
    const disabledAttr = await button.getAttribute('disabled');
    return disabledAttr !== null;
  }
}
