import { AddNewCustomerPageService } from 'ui/services/customers/addNewCustomer.service';
import { CustomersListPageService } from 'ui/services/customers/customers.service';
import { HomePageService } from 'ui/services/home.service';
import { SignInPageService } from 'ui/services/signIn.service';
import { test as base } from 'fixtures/pages.fixture';
import { EditCustomerPageService } from 'ui/services/customers/editCustomer.service';
import { CustomersDetailsPageService } from 'ui/services/customers/customerDetails.service';
import { ProductsListPageService } from 'ui/services/products/products.service';
import { AddNewProductPageService } from 'ui/services/products/addNewProduct.service';
import { EditProductPageService } from 'ui/services/products/editProducts.service';
import { OrdersListPageService } from 'ui/services/orders/orders.service';
import { SheduleDeliveryService } from 'ui/services/orders/sheduleDelivery.service';
import { OrderDetailsPageService } from 'ui/services/orders/orderDetails.service';

interface ISalesPortalPageServices {
  signInPageService: SignInPageService;
  homePageService: HomePageService;
  customersPageService: CustomersListPageService;
  addNewCustomerPageService: AddNewCustomerPageService;
  productsPageService: ProductsListPageService;
  addNewProductPageService: AddNewProductPageService;
  editProductsPageService: EditProductPageService;
  editCustomerPageService: EditCustomerPageService;
  customerDetailsPageService: CustomersDetailsPageService;
  ordersListPageService: OrdersListPageService;
  sheduleDeliveryService: SheduleDeliveryService;
  orderDetailsPageService: OrderDetailsPageService;
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
  productsPageService: async ({ page }, use) =>
    await use(new ProductsListPageService(page)),
  addNewProductPageService: async ({ page }, use) =>
    await use(new AddNewProductPageService(page)),
  editProductsPageService: async ({ page }, use) =>
    await use(new EditProductPageService(page)),
  editCustomerPageService: async ({ page }, use) =>
    await use(new EditCustomerPageService(page)),
  customerDetailsPageService: async ({ page }, use) =>
    await use(new CustomersDetailsPageService(page)),
  ordersListPageService: async ({ page }, use) =>
    await use(new OrdersListPageService(page)),
  sheduleDeliveryService: async ({ page }, use) =>
    await use(new SheduleDeliveryService(page)),
  orderDetailsPageService: async ({ page }, use) =>
    await use(new OrderDetailsPageService(page))
});

export { expect } from './pages.fixture';
