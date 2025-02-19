import { expect, Page } from '@playwright/test';
import { IProduct } from 'data/types/product.types';
import { EditProductPage } from 'ui/pages/products/editProduct.page';
import { ProductsListPage } from 'ui/pages/products/products.page';
import { DeleteProductModal } from 'ui/pages/products/deleteProduct.modal';
import { generateProductData } from 'data/products/generateProduct';
import { titlesForProducts } from 'data/titles';

export class EditProductPageService {
  private productsPage: ProductsListPage;
  private editProductPage: EditProductPage;
  private deleteProductModal: DeleteProductModal;

  constructor(protected page: Page) {
    this.productsPage = new ProductsListPage(page);
    this.editProductPage = new EditProductPage(page);
    this.deleteProductModal = new DeleteProductModal(page);
  }

  async fillProductInputs(product: Partial<IProduct>) {
    await this.editProductPage.fillInputsForEdit(product);
  }

  async saveChanges() {
    await this.editProductPage.clickOnSaveButton();
    await this.editProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  async updateProduct(product?: IProduct) {
    const productData = product ?? generateProductData();
    await this.fillProductInputs(productData);
    await this.saveChanges();
  }

  async openProducts() {
    await this.editProductPage.clickOnBackToProductsButton();
    await this.productsPage.waitForOpened();
  }

  async deleteProduct() {
    await this.editProductPage.clickOnDeleteProductButton();
    await this.deleteProductModal.waitForOpened();
    await this.deleteProductModal.clickOnDeleteButton;
    await this.editProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  async clickDeleteOnEditPage() {
    await this.editProductPage.clickOnDeleteProductButton();
  }

  async checkUIDeleteModal() {
    await this.deleteProductModal.waitForPageOpened();
    await expect(this.deleteProductModal['Modal Content']).toHaveScreenshot();
    await expect(this.deleteProductModal['Title']).toContainText(
      titlesForProducts.delete
    );
  }

  async editCreatedProduct(productName: string, product: Partial<IProduct>) {
    await this.productsPage.clickOnEditProduct(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.editProductPage.waitForOpened();
    await this.editProductPage.fillInputsForEdit(product);
    await this.editProductPage.clickOnSaveButton();
  }

  async editCreatedProductFromDetails(product: Partial<IProduct>) {
    await this.editProductPage.fillInputsForEdit(product);
    await this.editProductPage.clickOnSaveButton();
  }

  async editDeletedProduct() {
    await this.editProductPage.clickOnDeleteProductButton();
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
    await this.editProductPage.fillInputsForEdit(product);
    const isDisabled = await this.editProductPage.isSaveButtonDisabled();
    expect(isDisabled).toBe(true);
  }
}
