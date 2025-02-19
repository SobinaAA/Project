import { SalesPortalPage } from 'ui/pages/salesPortal.page';

export class OrdersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()[contains(.,"Orders List")]]';

  readonly 'Add New Order Button' = this.findElement(
    'button.page-title-header'
  );
  readonly 'Table row selector' = (orderNumber: string) =>
    this.findElement(`//tbody/tr[contains(., "${orderNumber}")]`);
  readonly 'Details button by table row' = (orderNumber: string) =>
    this.findElement(
      `${this['Table row selector'](orderNumber)}//button[@title="Details"]`
    );
  readonly 'Filter Button' = this.findElement('#filter');

  readonly 'Main Content' = this.findElement('.bg-body:nth-child(2)');
  readonly 'Title Content' = this.findElement('.bg-body:nth-child(1)');
  readonly ['Details Buttons'] = '[title = "Details"]';

  async clickOnAddNewOrder() {
    await this.click(this['Add New Order Button']);
  }

  async openFilters() {
    await this.click(this['Filter Button']);
  }
}
