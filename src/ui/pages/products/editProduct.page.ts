//import { IProduct } from 'data/types/product.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class EditProductPage extends SalesPortalPage {
  readonly uniqueElement = '#edit-product-container';
  readonly ['Main Content'] = this.findElement('.mb-5');
  readonly ['Title'] = this.findElement('.page-title-text');
  readonly ['Save Changes Button'] = this.findElement('#save-product-changes');
  readonly ['Delete Product Button'] = this.findElement('#delete-product-btn');
  readonly ['Back to Products Button'] = this.findElement('.back-link');
}
