import { SalesPortalPage } from '../salesPortal.page';

export class FilterOrdersModal extends SalesPortalPage {
  readonly uniqueElement = '.modal-title';

  async submitFilters() {
    await this.click(this['Submit button']);
  }
  async clearFilters() {
    await this.click(this['Clear Filters button']);
  }
}
