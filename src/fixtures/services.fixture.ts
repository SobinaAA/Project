import { AddNewCustomerPageService } from 'ui/services/customers/addNewCustomer.service';
import { CustomersListPageService } from 'ui/services/customers/customers.service';
import { HomePageService } from 'ui/services/home.service';
import { SignInPageService } from 'ui/services/signIn.service';
import { test as base } from 'fixtures/pages.fixture';
import { EditCustomerPageService } from 'ui/services/customers/editCustomer.service';
import { CustomersDetailsPageService } from 'ui/services/customers/customerDetails.service';

interface ISalesPortalPageServices {
  signInPageService: SignInPageService;
  homePageService: HomePageService;
  customersPageService: CustomersListPageService;
  addNewCustomerPageService: AddNewCustomerPageService;
  editCustomerPageService: EditCustomerPageService;
  customerDetailsPageService: CustomersDetailsPageService;
}

export const test = base.extend<ISalesPortalPageServices>({
  signInPageService: async ({ page }, use) =>
    await use(new SignInPageService(page)),
  homePageService: async ({ page }, use) =>
    await use(new HomePageService(page)),
  customersPageService: async ({ page }, use) =>
    await use(new CustomersListPageService(page)),
  addNewCustomerPageService: async ({ page }, use) =>
    await use(new AddNewCustomerPageService(page)),
  editCustomerPageService: async ({ page }, use) =>
    await use(new EditCustomerPageService(page)),
  customerDetailsPageService: async ({ page }, use) =>
    await use(new CustomersDetailsPageService(page))
});

export { expect } from './pages.fixture';
