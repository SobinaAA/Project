import { STATUS_CODES } from 'data/statusCodes';
import { SignInApiService } from 'api/services/signInApi.service';
import { IOrderRequestParams } from 'data/types/requestParams';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { OrdersAPIController } from 'api/controllers/orders.controller';
import { allOrdersResponseSchema } from 'data/jsonSchemas/order.schema';

export class OrdersApiService {
  constructor(
    private ordersController = new OrdersAPIController(),
    private signInApiService = new SignInApiService()
  ) {}

  //   async create(customerData?: Partial<ICustomer>) {
  //     const token = await this.signInApiService.getTransformedToken();

  //     const response = await this.customersController.create(
  //       generateNewCustomer(customerData),
  //       token
  //     );
  //     validateResponse(response, STATUS_CODES.CREATED, true, null);
  //     return response.body.Customer;
  //   }

  async getAll(params?: IOrderRequestParams) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allOrdersResponseSchema, response);
    return response;
  }

  //   async delete(id: string) {
  //     const token = await this.signInApiService.getTransformedToken();
  //     const response = await this.customersController.delete(id, token);
  //     validateResponse(response, STATUS_CODES.DELETED);
  //   }

  //   async update(id: string, customerData?: Partial<ICustomer>) {
  //     const token = await this.signInApiService.getTransformedToken();

  //     const response = await this.customersController.update({
  //       id,
  //       token,
  //       body: generateNewCustomer(customerData)
  //     });
  //     validateResponse(response, STATUS_CODES.OK, true, null);
  //     return response.body.Customer;
  //   }

  //   async getByID(id: string) {
  //     const token = await this.signInApiService.getTransformedToken();

  //     const response = await this.customersController.getByID(id, token);
  //     validateResponse(response, STATUS_CODES.OK, true, null);
  //     return response.body.Customer;
  //   }
}
