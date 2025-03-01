import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page.js';
import { ProductsListPage } from 'ui/pages/products/products.page';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from 'data/notifications.js';
import { SalesPortalPageService } from 'ui/services/salesPortal.service.js';
import { DeleteProductModal } from 'ui/pages/products/deleteProduct.modal';
import { titlesForProducts } from 'data/titles';
import { EditProductPage } from 'ui/pages/products/editProduct.page';
import { DetailsProductModal } from 'ui/pages/products/detailsProduct.modal';
import { IProduct } from 'data/types/product.types';
import _ from 'lodash';

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

  async openEditProductPage(productName: string) {
    await this.productsPage.clickOnEditProduct(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.editProductPage.waitForOpened();
  }

  async openDeleteProductModal(productName: string) {
    await this.productsPage.clickOnDeleteProduct(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.deleteProductModal.waitForOpened();
  }

  async openDetailsProductModal(productName: string) {
    await this.productsPage.clickOnDetailsProduct(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.detailsProductModal.waitForOpened();
  }

  async validateCreateProductNotification() {
    const notificationText = await this.productsPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.PRODUCT_CREATED);
  }

  async deleteProduct(productName: string) {
    await this.openDeleteProductModal(productName);
    await this.deleteProductModal.getTitleText();
    await this.deleteProductModal.clickOnDeleteButton();
    await this.productsPage.checkForProductAbsence(productName);
  }

  async verifyProductDetails(product: IProduct): Promise<void> {
    await this.openDetailsProductModal(product.name);
    await this.detailsProductModal.verifyProductDetails(product);
  }

  async openEditFromDetailsProduct(product: IProduct): Promise<void> {
    await this.openDetailsProductModal(product.name);
    await this.detailsProductModal.verifyProductDetails(product);
    await this.detailsProductModal.clickOnEditButton();
    await this.productsPage.waitForSpinnerToHide();
    await this.editProductPage.waitForOpened();
  }

  async checkProductInTable(product: IProduct) {
    const actualProductData = await this.productsPage.getProductFromTable(
      product.name
    );

    expect(
      _.pick(actualProductData, ['name', 'price', 'manufacturer'])
    ).toEqual({
      name: product.name,
      price: `$${product.price}`,
      manufacturer: product.manufacturer
    });
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
    await expect(this.deleteProductModal['Title']).toContainText(
      titlesForProducts.delete
    );
  }

  async checkAddNewProductPage() {
    await expect(this.addNewProductPage['Main Content']).toHaveScreenshot();
    await expect(this.addNewProductPage['Title']).toContainText(
      titlesForProducts.add
    );
  }
  async checkDetailsProductPage() {
    await expect(this.detailsProductModal['Main Content']).toHaveScreenshot();
    await expect(this.detailsProductModal['Title']).toContainText(
      titlesForProducts.details
    );
  }

  async checkUIModalDelete(n: number = 1) {
    const allDeleteButtons = await this.productsPage.findElementArray(
      this.productsPage['Delete Buttons']
    );
    if (!n) {
      const random =
        Math.floor((Math.random() * allDeleteButtons.length) / 20) + 1;
      await allDeleteButtons[random].scrollIntoViewIfNeeded();
      await allDeleteButtons[random].click();
    } else {
      await allDeleteButtons[n].scrollIntoViewIfNeeded();
      allDeleteButtons[n].click();
    }
    await this.deleteProductModal.waitForPageOpened();
    await expect(this.deleteProductModal['Modal Content']).toHaveScreenshot();
    await expect(this.deleteProductModal['Title']).toContainText(
      titlesForProducts.delete
    );
  }

  async checkUIAddNewProductPage() {
    await expect(this.addNewProductPage['Main Content']).toHaveScreenshot();
  }

  async openEditRandomProduct(n: number = 1) {
    const allEditButtons = await this.productsPage.findElementArray(
      this.productsPage['Edit Buttons']
    );
    if (!n) {
      const random =
        Math.floor((Math.random() * allEditButtons.length) / 20) + 1;
      await allEditButtons[random].scrollIntoViewIfNeeded();
      await allEditButtons[random].click();
    } else {
      await allEditButtons[n].scrollIntoViewIfNeeded();
      allEditButtons[n].click();
    }
    this.editProductPage.waitForOpened();
  }

  async openDetailsRandomProduct(n: number = 1) {
    const allDetailsButtons = await this.productsPage.findElementArray(
      this.productsPage['Details Buttons']
    );
    if (!n) {
      const random =
        Math.floor((Math.random() * allDetailsButtons.length) / 20) + 1;
      await allDetailsButtons[random].scrollIntoViewIfNeeded();
      await allDetailsButtons[random].click();
    } else {
      await allDetailsButtons[n].scrollIntoViewIfNeeded();
      allDetailsButtons[n].click();
    }
    await this.detailsProductModal.waitForOpened();
  }

  async checkEditProductPage() {
    await expect(this.editProductPage['Main Content']).toHaveScreenshot();
    await expect(this.editProductPage['Title']).toContainText(
      titlesForProducts.edit
    );
  }
}
