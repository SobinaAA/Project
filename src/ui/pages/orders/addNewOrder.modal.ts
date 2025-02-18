import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class AddNewOrderModal extends SalesPortalPage {
  uniqueElement = '.modal-title';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Modal Content'] = this.findElement('.modal-content');
  //выпадающие меню, крестик, отмена и сохранить, иконка удаления, кнопка добавления продукта
}
