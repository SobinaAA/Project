import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import {expect} from '@playwright/test';

export class OrdersDetailsPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Order Details"]';
  readonly 'Edit Customer pencil' = this.findElement('#edit-customer-pencil');
  readonly 'Edit Products pencil' = this.findElement('#edit-products-pencil');
  readonly 'Customer Details' = this.findElement('#customer-section .c-details');
  readonly 'Requested Products Container' = this.findElement('#products-section');
  readonly 'productDetailSelector' = '.c-details';
  readonly 'productNameSelector' = 'span.s-span';

  async clickOnEditCustomer() {
    await this.click(this['Edit Customer pencil']);
  }

  async clickOnEditProducts() {
    await this.click(this['Edit Products pencil']);
  }

  async getCustomerNameFromDetails(): Promise<string> {
    const detailsLocator = this['Customer Details'].filter({ hasText: 'Name' });
    const nameLocator = detailsLocator.locator(this['productNameSelector']).nth(1);
    return (await nameLocator.textContent()) || '';
  }


  async checkProductNotPresent(productName: string): Promise<void> {
    const productLocator = this['Requested Products Container'].locator(`text=${productName}`);
    await expect(productLocator).toHaveCount(0, { timeout: 5000 });
  }


  async getLastProductName(): Promise<string> {
    const nameDetails = this['Requested Products Container'].locator(this.productDetailSelector)
      .filter({ hasText: 'Name' });
    const count = await nameDetails.count();
    const lastDetail = nameDetails.nth(count - 1);
    const productNameLocator = lastDetail.locator(this['productNameSelector']).nth(1);
    const productName = await productNameLocator.textContent();
    return productName || '';
  }
}

