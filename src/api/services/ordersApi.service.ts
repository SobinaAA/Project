import { STATUS_CODES } from 'data/statusCodes';
import { SignInApiService } from 'api/services/signInApi.service';
import { IOrderRequestParams } from 'data/types/requestParams';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { OrdersAPIController } from 'api/controllers/orders.controller';
import { allOrdersResponseSchema } from 'data/jsonSchemas/order.schema';
import { IOrderData } from 'data/types/orders.types';
import { CustomersApiService } from './customersApi.service';
import { ProductsApiService } from './productApi.service';
import { ORDER_STATUS } from 'data/orders/statuses';
//import _ from 'lodash';

export class OrdersApiService {
  constructor(
    private ordersController = new OrdersAPIController(),
    private signInApiService = new SignInApiService(),
    private customersApiService = new CustomersApiService(),
    private productsAPIService = new ProductsApiService()
  ) {}

  async create(data: IOrderData) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.create(data, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Order;
  }

  async createRandomOrder() {
    const cust_1 = await this.customersApiService.create();
    const cust_2 = await this.customersApiService.create();
    const prod_1 = await this.productsAPIService.create();
    const prod_2 = await this.productsAPIService.create();
    const order_1 = await this.create({
      customer: cust_1._id,
      products: [prod_1._id]
    });
    const order_2 = await this.create({
      customer: cust_2._id,
      products: [prod_2._id, prod_1._id]
    });
    const result = {
      order_1: order_1._id,
      order_2: order_2._id,
      product_1: prod_1._id,
      product_2: prod_2._id,
      customer_1: cust_1._id,
      customer_2: cust_2._id
    };
    // const status_1 = _.sample(Object.values(ORDER_STATUS));
    // const status_2 = _.sample(Object.values(ORDER_STATUS));
    // console.log('STATUSES!', status_1, status_2);
    // await this.updateStatus(order_1._id, status_1 as ORDER_STATUS);
    // await this.updateStatus(order_1._id, status_2 as ORDER_STATUS);
    return result;
  }

  async getAll(params?: IOrderRequestParams) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allOrdersResponseSchema, response);
    return response;
  }

  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.delete(id, token);
    validateResponse(response, STATUS_CODES.DELETED);
  }

  async updateStatus(id: string, status: ORDER_STATUS) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.ordersController.updateStatus({
      id,
      token,
      status
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Order;
  }

  //   async getByID(id: string) {
  //     const token = await this.signInApiService.getTransformedToken();

  //     const response = await this.customersController.getByID(id, token);
  //     validateResponse(response, STATUS_CODES.OK, true, null);
  //     return response.body.Customer;
  //   }
}
