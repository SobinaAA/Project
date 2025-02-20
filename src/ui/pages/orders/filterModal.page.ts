import { SalesPortalPage } from '../salesPortal.page';

export class FilterOrdersModal extends SalesPortalPage {
  readonly uniqueElement = '.modal-title';
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Title text'] = this.findElement(`${this['Modal container']}//h5`);
  readonly ['Check Box by Status'] = (status: string) =>
    `[value = "${status}"]`;
  readonly ['Submit button'] = '#apply-filters';
  readonly ['Clear Filters button'] = 'clear-filters';

  async chooseStatus(status: string) {
    await this.click(this['Check Box by Status'](status));
  }

  async getTitleText(): Promise<string> {
    return await this.getText(this['Title text']);
  }

  async submitFilters() {
    await this.click(this['Submit button']);
  }
  async clearFilters() {
    await this.click(this['Clear Filters button']);
  }
}
