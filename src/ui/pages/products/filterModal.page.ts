import { SalesPortalPage } from '../salesPortal.page';

export class FilterModal extends SalesPortalPage {
  readonly uniqueElement = '.modal-title';
  readonly ['Check Box by Country'] = (country: string) =>
    `[value = "${country}"]`;
  readonly ['Submit button'] = '#apply-filters';
  readonly ['Clear Filters button'] = 'clear-filters';

  async chooseCountry(country: string) {
    await this.click(this['Check Box by Country'](country));
  }

  async chooseCountryByText(country: string) {
    this.page.getByText(country).click();
  }
  async submitFilters() {
    await this.click(this['Submit button']);
  }
  async clearFilters() {
    await this.click(this['Clear Filters button']);
  }
}
