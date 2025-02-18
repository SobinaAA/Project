import { COUNTRIES } from 'data/customers/countries';
import { ICustomerFromResponse } from 'data/types/customers.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class DetailsCustomerPage extends SalesPortalPage {
  readonly uniqueElement = '#customer-info-container';
  readonly ['Main Content'] = this.findElement('#customer-info-container');
  readonly ['Title'] = this.findElement('.card-title > h3');
  readonly 'Back button' = '.back-link';
  readonly 'Title Customers' = '.card-title > h3';
  readonly 'Edit button' = '#edit-customer-pencil';
  readonly 'Email' = '#customer-email';
  readonly 'Name' = '#customer-name';
  readonly 'Phone' = '#customer-phone';
  readonly 'Registration Date' = '#customer-created-on';
  readonly 'Country' = '#customer-country';
  readonly 'City' = '#customer-city';
  readonly 'Street' = '#customer-street';
  readonly 'House' = '#customer-house';
  readonly 'Flat' = '#customer-flat';
  readonly 'Notes' = '#customer-notes';
  readonly 'Orders' = '#customer-orders-container';
  readonly 'Title orders' = '.card-body >h3';
  readonly 'Order Number' = (orderId: string) =>
    `//tr[td/button[text()="${orderId}"]]`;
  readonly 'Order Price' = (orderId: string) =>
    `//tr[td/button[text()="${orderId}"]]/td[2]`;
  readonly 'Order Status' = (orderId: string) =>
    `//tr[td/button[text()="${orderId}"]]/td[3]`;
  readonly 'Order Created On' = (orderId: string) =>
    `//tr[td/button[text()="${orderId}"]]/td[4]`;
  readonly 'Order Last Modified' = (orderId: string) =>
    `//tr[td/button[text()="${orderId}"]]/td[5]`;

  async clickOnBackToCustomers() {
    await this.click(this['Back button']);
  }
  async clickOnEditCustomerDetails() {
    await this.click(this['Edit button']);
  }
  async clickOnOrderNumberId(orderId: string) {
    await this.click(this['Order Number'](orderId));
  }

  async getOrderFromTable(orderId: string) {
    const [number, price, status, createdOn, lastModified] = await Promise.all([
      this.getText(this['Order Number'](orderId)),
      this.getText(this['Order Price'](orderId)),
      this.getText(this['Order Status'](orderId)),
      this.getText(this['Order Created On'](orderId)),
      this.getText(this['Order Last Modified'](orderId))
    ]);

    return {
      number,
      price: +price.replace('$', ''),
      status,
      createdOn,
      lastModified
    };
  }
  async getCustomerDetails(): Promise<Omit<ICustomerFromResponse, '_id'>> {
    const [
      email,
      name,
      phone,
      createdOn,
      country,
      city,
      street,
      house,
      flat,
      notes
    ] = await Promise.all([
      this.getText(this['Email']),
      this.getText(this['Name']),
      this.getText(this['Phone']),
      this.getText(this['Registration Date']),
      this.getText(this['Country']),
      this.getText(this['City']),
      this.getText(this['Street']),
      this.getText(this['House']),
      this.getText(this['Flat']),
      this.getText(this['Notes'])
    ]);

    return {
      email,
      name,
      phone,
      createdOn,
      country: country as COUNTRIES,
      city,
      street,
      house: +house,
      flat: +flat,
      ...(notes && { notes })
    };
  }
}
