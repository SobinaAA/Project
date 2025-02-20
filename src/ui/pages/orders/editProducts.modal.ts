import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class EditOrderProductsModal extends SalesPortalPage {
  uniqueElement = '//div[@role="dialog"]//h5';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Modal Content'] = this.findElement('.modal-content');
  readonly ['Modal footer'] = this.findElement('.modal-footer');
  readonly ['Add Product button'] = this.findElement('#add-product-btn');
  readonly ['Save button'] = this.findElement(
    '.modal-footer button#update-products-btn'
  );
  readonly ['Cancel button'] = this.findElement(
    '.modal-footer button#cancel-edit-products-modal-btn'
  );
  readonly ['Close button'] = this.findElement(
    '//div[@role="dialog"]//button[@aria-label="Close"]'
  );
  readonly ['Product Order input'] = this.findElement(
    'div[role="dialog"] select[name="Product"]'
  );
  readonly ['Order Product Container'] = this.findElement('div[data-id]');
  readonly ['Delete button'] = this.findElement('button.del-btn-modal');

  async updateLastAddedProduct(productName: string): Promise<void> {
    const dropdowns = this['Product Order input'];
    const count = await dropdowns.count();
    const targetDropdown = dropdowns.nth(count - 1);
    await targetDropdown.selectOption({ label: productName });
  }

  async deleteOrderProductByName(productName: string): Promise<void> {
    const productContainers = this['Order Product Container'].filter({
      hasText: productName
    });
    const count = await productContainers.count();
    const targetIndex = count - 1;
    const targetContainer = productContainers.nth(targetIndex);
    const deleteButton = targetContainer.locator(this['Delete button']);
    await deleteButton.click();
  }

  async clickOnSaveButton() {
    await this.click(this['Save button']);
  }

  async clickOnAddNewProductButton() {
    await this.click(this['Add Product button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickOnCloseButton() {
    await this.click(this['Close button']);
  }
}
