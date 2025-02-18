import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class EditOrderCustomerModal extends SalesPortalPage {
  uniqueElement = '//div[@role="dialog"]//h5';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Modal Content'] = this.findElement('.modal-content');
  //выпадающее меню, крестик, отмена и сохранить
}
