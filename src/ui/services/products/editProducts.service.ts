import { SalesPortalPageService } from 'ui/services/salesPortal.service';
import { ProductsListPage } from 'ui/pages/products/products.page';
import { EditProductPage } from 'ui/pages/products/editProduct.page';
import { IProduct } from 'data/types/product.types';
import { expect, Page } from '@playwright/test';
import { DeleteProductModal } from 'ui/pages/products/deleteProduct.modal';

export class EditProductPageService extends SalesPortalPageService {
  protected productsPage: ProductsListPage;
  private editProductPage: EditProductPage;
  private deleteProductModal: DeleteProductModal;

  constructor(protected page: Page) {
    super(page);
    this.productsPage = new ProductsListPage(page);
    this.editProductPage = new EditProductPage(page);
    this.deleteProductModal = new DeleteProductModal(page);
  }

  async editCreatedProduct(productName: string, product: Partial<IProduct>) {
    await this.productsPage.clickOnEditProduct(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.editProductPage.waitForOpened();
    await this.editProductPage.updateProductFields(product);
    await this.editProductPage.clickOnSaveChangesButton();
  }

  async editCreatedProductFromDetails(product: Partial<IProduct>) {
    await this.editProductPage.updateProductFields(product);
    await this.editProductPage.clickOnSaveChangesButton();
  }

  async editDeletedProduct() {
    await this.editProductPage.clickOnDeleteButton();
    await this.productsPage.waitForSpinnerToHide();
    await this.editProductPage.waitForOpened();
    await this.productsPage.waitForSpinnerToHide();
    await this.deleteProductModal.waitForOpened();
    await this.deleteProductModal.getTitleText();
    await this.deleteProductModal.clickOnDeleteButton();
  }

  async editAndValidateInvalidProductDisabledSave(
    product: Partial<IProduct>
  ): Promise<void> {
    await this.editProductPage.updateProductFields(product);
    const isDisabled = await this.editProductPage.isSaveButtonDisabled();
    expect(isDisabled).toBe(true);
  }
}
