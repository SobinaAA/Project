import { STATUS_CODES } from 'data/statusCodes';
import { OrdersController } from 'api/controllers/orders.controller';
import { SignInApiService } from 'api/services/signInApi.service';
import { validateResponse } from 'utils/validation/apiValidation';

export class OrdersApiService {
  constructor(
    private ordersController = new OrdersController(),
    private signInApiService = new SignInApiService()
  ) {}

  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.delete(id, token);
    validateResponse(response, STATUS_CODES.DELETED);
  }

  async getById(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.getById(id, token);
    validateResponse(response, STATUS_CODES.OK, true, null);
  }
}
