import { Page } from '@playwright/test';
import { generateProductData } from 'data/products/generateProduct';
import { IProduct } from 'data/types/product.types';
import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page';
import { ProductsListPage } from 'ui/pages/products/products.page.js';
import { expect } from '@playwright/test';

export class AddNewProductPageService {
  private productsPage: ProductsListPage;
  private addNewProductPage: AddNewProductPage;

  constructor(protected page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsPage = new ProductsListPage(page);
  }

  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }

  async create(product?: IProduct) {
    const productData = product ?? generateProductData();
    await this.fillProductInputs(productData);
    await this.save();
    await this.addNewProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
    return productData;
  }

  async createAndValidateInvalidProductDisabledSave(
    product: Partial<IProduct>
  ): Promise<void> {
    await this.fillProductInputs(product);
    const isDisabled = await this.addNewProductPage.isSaveButtonDisabled();
    expect(isDisabled).toBe(true);
  }
}
