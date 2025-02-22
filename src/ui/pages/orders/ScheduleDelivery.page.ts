import { SalesPortalPage } from 'ui/pages/salesPortal.page';
import {
  IDelivery,
  DELIVERY_CONDITIONS,
  DELIVERY_LOCATION
} from 'data/types/orders.types';

export class ScheduleDeliveryPage extends SalesPortalPage {
  uniqueElement = '#div-inputType';

  readonly 'Save Button' = this.findElement('#save-delivery');
  readonly 'Cancel Button' = this.findElement('#back-to-order-details-page');
  readonly 'Delivery Option' = this.findElement('#inputType');
  readonly 'Date Input Field' = this.findElement('#date-input');
  readonly 'Location Input' = this.findElement('#inputLocation');
  readonly 'Country Input' = this.findElement('#inputCountry');
  readonly 'City Input' = this.findElement('#inputCity');
  readonly 'Street Input' = this.findElement('#inputStreet');
  readonly 'House Input' = this.findElement('#inputHouse');
  readonly 'Flat Input' = this.findElement('#inputFlat');

  async fillDateField(finalDate: string): Promise<void> {
    await this['Date Input Field'].evaluate(
      (input: HTMLInputElement, newDate: string) => {
        input.removeAttribute('readonly');
        input.value = newDate;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
      },
      finalDate
    );
  }

  async fillLocationField(location: string): Promise<void> {
    const isVisible = await this['Location Input']
      .isVisible()
      .catch(() => false);
    if (isVisible) {
      await this.selectDropdownValue(this['Location Input'], location);
    }
  }

  async fillCountry(country: string): Promise<void> {
    const isVisible = await this['Country Input']
      .isVisible()
      .catch(() => false);
    if (isVisible) {
      await this.selectDropdownValue(this['Country Input'], country);
    }
  }

  async fillAddress(address: {
    country: string;
    city: string;
    street: string;
    house: number;
    flat: number;
  }): Promise<void> {
    await this.fillCountry(address.country);
    await this.setValue(this['City Input'], address.city);
    await this.setValue(this['Street Input'], address.street);
    await this.setValue(this['House Input'], address.house.toString());
    await this.setValue(this['Flat Input'], address.flat.toString());
  }

  async fillInputs(delivery: Partial<IDelivery>) {
    delivery.condition &&
      (await this.selectDropdownValue(
        this['Delivery Option'],
        delivery.condition
      ));
    delivery.finalDate && (await this.fillDateField(delivery.finalDate));

    delivery.condition === DELIVERY_CONDITIONS.DELIVERY &&
      delivery.location &&
      (await this.fillLocationField(delivery.location));

    delivery.condition === DELIVERY_CONDITIONS.DELIVERY &&
      delivery.location === DELIVERY_LOCATION.OTHER &&
      delivery.address &&
      (await this.fillAddress(delivery.address));

    delivery.condition === DELIVERY_CONDITIONS.PICK_UP &&
      delivery.address &&
      (await this.fillCountry(delivery.address.country));
  }

  async clickOnSaveButton() {
    await this.click(this['Save Button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel Button']);
  }
}
