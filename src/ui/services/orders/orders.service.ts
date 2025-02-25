// import { Page } from '@playwright/test';
// import { OrdersDetailsPage } from 'ui/pages/orders/orderDetails.page';
// import { SalesPortalPageService } from 'ui/services/salesPortal.service';
// import { AddNewOrderModal } from 'ui/pages/orders/addNewOrder.modal';
// import { OrdersListPage } from 'ui/pages/orders/orders.page';
// import { IOrderData } from 'data/types/orders.types';
// import { expect } from 'chai';
// import { expect as expect_PW } from '@playwright/test';
// import _ from 'lodash';
// import { FilterOrdersModal } from 'ui/pages/orders/filterModal.page';
// import { sortMethodOrders, direction, ISort } from 'data/types/sorting.types';
// import { ORDER_STATUS } from 'data/orders/statuses';

// export class OrdersListPageService extends SalesPortalPageService {
//   openDetailsRandomCustomer() {
//     throw new Error('Method not implemented.');
//   }
//   openFiltersModal() {
//     throw new Error('Method not implemented.');
//   }
//   checkFilterModal() {
//     throw new Error('Method not implemented.');
//   }
//   checkEmptyList() {
//     throw new Error('Method not implemented.');
//   }
//   protected ordersPage: OrdersListPage;
//   private addNewOrderModal: AddNewOrderModal;
//   protected ordersDetailsPage: OrdersDetailsPage;
//   protected filterModal: FilterOrdersModal;

//   constructor(protected page: Page) {
//     super(page);
//     this.ordersDetailsPage = new OrdersDetailsPage(page);
//     this.ordersPage = new OrdersListPage(page);
//     this.addNewOrderModal = new AddNewOrderModal(page);
//     this.filterModal = new FilterOrdersModal(page);
//   }
//   async openAddNewOrderModal() {
//     await this.ordersPage.clickOnAddNewOrder();
//     await this.addNewOrderModal.waitForSpinnerToHide();
//     await this.addNewOrderModal.waitForOpened();
//   }

//   async openDetailsOrder(customerName: string) {
//     await this.ordersPage.clickOnDetailsButton(customerName);
//     await this.ordersDetailsPage.waitForSpinnersToHide();
//     await this.ordersDetailsPage.waitForOpened();
//   }

//   async getOrderId(customerName: string) {
//     const orderData = await this.ordersPage.getOrderFromTable(customerName);
//     return orderData.orderNumber;
//   }

//   async createOrder(order: IOrderData): Promise<void> {
//     await this.openAddNewOrderModal();
//     await this.addNewOrderModal.selectCustomer(order.customer);
//     for (let i = 0; i < order.products.length; i++) {
//       if (i > 0) {
//         await this.addNewOrderModal.clickOnAddProductButton();
//       }
//       await this.addNewOrderModal.selectProductByName(order.products[i], i);
//     }
//     await this.addNewOrderModal.clickOnCreateButton();
//   }

//   async checkOrderInTable(order: IOrderData) {
//     const actualOrderData = await this.ordersPage.getOrderFromTable(
//       order.customer
//     );
//     const actualDataToCompare = _.pick(actualOrderData, ['customer', 'status']);
//     const expectedOrderData = {
//       customer: order.customer,
//       status: 'Draft'
//     };
//     expect(actualDataToCompare).to.deep.equal(expectedOrderData);
//   }

//   async openDetailsRandomCustomer(n: number = 1) {
//     const allDetailsButtons = await this.ordersPage.findElementArray(
//       this.ordersPage['Details Buttons']
//     );
//     if (!n) {
//       const random = Math.floor(Math.random() * allDetailsButtons.length) + 1;
//       await allDetailsButtons[random].scrollIntoViewIfNeeded();
//       await allDetailsButtons[random].click();
//     } else {
//       await allDetailsButtons[n].scrollIntoViewIfNeeded();
//       allDetailsButtons[n].click();
//     }
//     await this.ordersDetailsPage.waitForOpened();
//   }

//   async checkAddNewOrderModal() {
//     expect_PW(this.addNewOrderModal['Modal Content']).toHaveScreenshot(
//       'Create Order modal.png'
//     );
//     const actualTitle = await this.addNewOrderModal.getTitleText();
//     expect_PW(actualTitle).toContain('Create Order');
//   }

//   async openFiltersModal() {
//     await this.ordersPage['Filter Button'].click();
//     this.filterModal.waitForOpened();
//   }

//   async checkFilterModal() {
//     expect_PW(this.addNewOrderModal['Modal Content']).toHaveScreenshot(
//       'Filters.png'
//     );
//     const actualTitle = await this.filterModal.getTitleText();
//     expect_PW(actualTitle).toContain('Filters');
//   }

//   async checkEmptyList() {
//     await expect_PW(this.ordersPage['Main Content']).toHaveScreenshot(
//       'Empty list of orders.png',
//       { maxDiffPixels: 20 }
//     );
//   }

//   async sortBy(method: sortMethodOrders, dir: direction) {
//     let actualSort = await this.customersPage.getSorting();
//     const toDoSort: ISort = {
//       field: method,
//       direction: dir
//     };
//     await this.ordersPage.waitUntil(
//       async () => {
//         if (
//           toDoSort.field == actualSort.field &&
//           toDoSort.direction == actualSort.direction
//         ) {
//           return true;
//         }
//         await this.ordersPage.clickOnTableHeader(method);
//         actualSort = await this.ordersPage.getSorting();
//         return false;
//       },
//       {
//         timeout: 10000,
//         timeoutMsg: `Could not set direction to ${dir} within the timeout.`
//       }
//     );
//   }

//   async checkSorting(field: sortMethodOrders, dir: direction) {
//     const table = (await this.ordersPage.getOrdersTable()) as Record<
//       string,
//       string
//     >[];
//     let mySortedTable: Record<string, string | number>[] = [];
//     switch (field) {
//       case 'Order Number':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted((a, b) =>
//                 a['Order Number'].localeCompare(b['Order Number'])
//               )
//             : table.toSorted((a, b) =>
//                 b['Order Number'].localeCompare(a['Order Number'])
//               );
//         break;
//       case 'Name':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted((a, b) => a['Name'].localeCompare(b['Name']))
//             : table.toSorted((a, b) => b['Name'].localeCompare(a['Name']));
//         break;
//       case 'Delivery':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted((a, b) =>
//                 a['Delivery'].localeCompare(b['Delivery'])
//               )
//             : table.toSorted((a, b) =>
//                 b['Delivery'].localeCompare(a['Delivery'])
//               );
//         break;
//       case 'Email':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted((a, b) => a['Email'].localeCompare(b['Email']))
//             : table.toSorted((a, b) => b['Email'].localeCompare(a['Email']));
//         break;
//       case 'Status':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted((a, b) => a['Status'].localeCompare(b['Status']))
//             : table.toSorted((a, b) => b['Status'].localeCompare(a['Status']));
//         break;
//       case 'Price':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted((a, b) => +a['Price'] - +b['Price'])
//             : table.toSorted((a, b) => +b['Price'] - +a['Price']);
//         break;
//       case 'Created On':
//         mySortedTable =
//           dir === 'asc'
//             ? table.toSorted(
//                 (el1, el2) =>
//                   Date.parse(el1['Created On']) - Date.parse(el2['Created On'])
//               )
//             : table.toSorted(
//                 (el1, el2) =>
//                   Date.parse(el2['Created On']) - Date.parse(el1['Created On'])
//               );
//         break;
//       default:
//         throw new Error('Другие методы пока не реализованы!');
//     }
//     const key = field.toLocaleLowerCase();
//     const result = mySortedTable.every((obj, i) => {
//       return obj[key] === table[i][key];
//     });
//     console.log(result);
//     expect_PW(result).toBe(true);
//   }

//   async filterOrdersByStatus(status: ORDER_STATUS) {
//     await this.ordersPage.openFilters();
//     await this.filterModal.chooseStatus(status);
//     await this.filterModal.submitFilters();
//     await this.ordersPage.waitForOpened();
//   }

//   async checkFilterByStatus(status: ORDER_STATUS) {
//     const actualStatuses = await this.ordersPage.getAllStatuses();
//     const allFiltred = actualStatuses.every(async (elem) => {
//       const actual = await elem.innerText();
//       return actual === status;
//     });
//     expect_PW(allFiltred || actualStatuses.length === 0).toBeTruthy();
//   }

//   async searchWithInput(searchString: string) {
//     await this.ordersPage.fillSearchInput(searchString);
//     await this.ordersPage.clickOnSearchButton();
//     await this.ordersPage.waitForOpened();
//   }

//   async checkSearch(seacrhString: string) {
//     const table = (await this.ordersPage.getOrdersTable()) as Record<
//       string,
//       string
//     >[];
//     const result = table.some((recordOrder) => {
//       return (
//         recordOrder['Name'] === seacrhString ||
//         recordOrder['Number'] === seacrhString ||
//         recordOrder['Email'] === seacrhString ||
//         recordOrder['Price'] === seacrhString ||
//         recordOrder['Status']
//       );
//     });
//     expect_PW(result).toBeTruthy();
//   }
// }
