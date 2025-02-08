import { Page } from '@playwright/test';
import { generateProductData } from 'data/products/generateProduct';
import { IProduct } from 'data/types/product.types';
import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page';
import { ProductsListPage } from 'ui/pages/products/products.page';

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
  }
}
