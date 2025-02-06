//import { ICustomer } from 'data/types/customers.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class EditCustomerPage extends SalesPortalPage {
  readonly uniqueElement = '#save-customer-changes';
  readonly ['Main Content'] = this.findElement('#edit-customer-container');
  readonly ['Title'] = this.findElement('#title > h2');
  readonly ['Save Button'] = this.findElement('[type = "submit"]');
  readonly ['Delete Button'] = this.findElement('#delete-customer-btn');
}
