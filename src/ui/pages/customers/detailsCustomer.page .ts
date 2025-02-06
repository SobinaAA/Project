//import { ICustomer } from 'data/types/customers.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class DetailsCustomerPage extends SalesPortalPage {
  readonly uniqueElement = '.edit-pencil';
  readonly ['Main Content'] = this.findElement('#customer-info-container');
  readonly ['Title'] = this.findElement('.card-title > h3');
}
