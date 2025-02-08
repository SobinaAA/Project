import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class DetailsProductModal extends SalesPortalPage {
  readonly uniqueElement = '#details-modal-container';
  readonly ['Main Content'] = this.findElement('.modal-body');
  readonly ['Title'] = this.findElement('.modal-header');
  readonly ['Footer'] = this.findElement('.modal-footer');
  readonly ['Edit Product'] = this.findElement('.mr-10');
  readonly ['Cansel'] = this.findElement('.btn-secondary');
  readonly ['Cross'] = this.findElement('.btn-close');
}
