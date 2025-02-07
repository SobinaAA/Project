import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page.js';
import { ProductsListPage } from 'ui/pages/products/products.page';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from 'data/notifications.js';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { DeleteProductModal } from 'ui/pages/products/deleteProduct.modal';
import { titles } from 'data/titles';
import { EditProductPage } from 'ui/pages/products/editProduct.page';
import { DetailsProductModal } from 'ui/pages/products/detailsProduct.modal';

export class ProductsListPageService extends SalesPortalPageService {
  protected productsPage: ProductsListPage;
  private addNewProductPage: AddNewProductPage;
  private deleteProductModal: DeleteProductModal;
  private editProductPage: EditProductPage;
  private detailsProductModal: DetailsProductModal;
  constructor(protected page: Page) {
    super(page);
    this.productsPage = new ProductsListPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
    this.deleteProductModal = new DeleteProductModal(page);
    this.editProductPage = new EditProductPage(page);
    this.detailsProductModal = new DetailsProductModal(page);
  }

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async validateCreateProductNotification() {
    const notificationText = await this.productsPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.PRODUCT_CREATED);
  }

  async checkMainContent() {
    await expect(this.productsPage['Main Content']).toHaveScreenshot();
  }

  async checkTitleContent() {
    await expect(this.productsPage['Title Content']).toHaveScreenshot();
  }

  async checkDeleteModal() {
    await this.deleteProductModal.waitForPageOpened();
    await expect(this.deleteProductModal['Modal Content']).toHaveScreenshot();
    await expect(this.deleteProductModal['Title']).toContainText(titles.delete);
  }

  async checkAddNewProductPage() {
    await expect(this.addNewProductPage['Main Content']).toHaveScreenshot();
    await expect(this.addNewProductPage['Title']).toContainText(titles.add);
  }
  async checkDetailsProductPage() {
    await expect(this.detailsProductModal['Main Content']).toHaveScreenshot();
    await expect(this.detailsProductModal['Title']).toContainText(
      titles.details
    );
  }
}
