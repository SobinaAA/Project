import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  readonly 'Add New Customer button' = 'button.page-title-header';
  readonly 'Edit button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Edit"]`;
  readonly 'Empty table message' = 'td.fs-italic';
  readonly 'Customer Table Row by email' = (email: string) =>
    this.findElement(`tbody tr`).filter({ hasText: email });
  readonly 'Main Content' = this.findElement('.bg-body:nth-child(2)');
  readonly 'Filter Content' = this.findElement('.bg-body:first-child');
  readonly 'Delete Buttons' = this.findElement('[title="Delete"]');
  readonly 'Edit Buttons' = this.findElement('[title="Edit"]');
  readonly 'Details Buttons' = this.findElement('[title="Details"]');

  async clickOnAddNewCustomer() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this['Edit button by table row'](customerName));
  }

  async getEmptyTableMessage() {
    return this.getText(this['Empty table message']);
  }

  async getCustomerFromTable(customerEmail: string) {
    const [email, name, country, createdOn] = await Promise.all(
      (
        await this['Customer Table Row by email'](customerEmail)
          .locator('td')
          .all()
      ).map((td) => this.getText(td))
    );
    return { email, name, country, createdOn };
  }
}
