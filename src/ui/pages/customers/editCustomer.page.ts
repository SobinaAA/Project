import { ICustomer } from 'data/types/customers.types';
import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class EditCustomerPage extends SalesPortalPage {
  readonly uniqueElement = '#save-customer-changes';

  readonly 'Name input' = '#inputName';
  readonly 'Email input' = '#inputEmail';
  readonly 'Country dropdown' = 'select#inputCountry';
  readonly 'City input' = '#inputCity';
  readonly 'Street input' = '#inputStreet';
  readonly 'House input' = '#inputHouse';
  readonly 'Flat input' = '#inputFlat';
  readonly 'Phone input' = '#inputPhone';
  readonly 'Notes textarea' = '#textareaNotes';
  readonly ['Save Button'] = this.findElement('[type = "submit"]');
  readonly 'Clear all' = '#clear-inputs';
  readonly 'Back to Customers list' = '.back-link';
  readonly ['Delete Button'] = this.findElement('#delete-customer-btn');
  readonly ['Main Content'] = this.findElement('#edit-customer-container');
  readonly ['Title'] = this.findElement('#title > h2');

  async fillInputsForEdit(customer: Partial<ICustomer>) {
    customer.name && (await this.setValue(this['Name input'], customer.name));
    customer.email &&
      (await this.setValue(this['Email input'], customer.email));
    customer.country &&
      (await this.selectDropdownValue(
        this['Country dropdown'],
        customer.country
      ));
    customer.city && (await this.setValue(this['City input'], customer.city));
    customer.street &&
      (await this.setValue(this['Street input'], customer.street));
    customer.house &&
      (await this.setValue(this['House input'], customer.house));
    customer.flat && (await this.setValue(this['Flat input'], customer.flat));
    customer.phone &&
      (await this.setValue(this['Phone input'], customer.phone));
    customer.notes &&
      (await this.setValue(this['Notes textarea'], customer.notes));
  }

  async clickOnSaveButton() {
    await this.click(this['Save Button']);
  }

  async clickOnBackToCustomersButton() {
    await this.click(this['Back to Customers list']);
  }

  async clickOnDeleteCustomerButton() {
    await this.click(this['Delete Button']);
  }
}
