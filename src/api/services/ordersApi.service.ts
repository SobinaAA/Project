import { STATUS_CODES } from 'data/statusCodes';
import { SignInApiService } from 'api/services/signInApi.service';
import { IOrderRequestParams } from 'data/types/requestParams';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { OrdersAPIController } from 'api/controllers/orders.controller';
import { allOrdersResponseSchema } from 'data/jsonSchemas/order.schema';
import { IDelivery, IOrderData } from 'data/types/orders.types';
import { CustomersApiService } from './customersApi.service';
import { ProductsApiService } from './productApi.service';
import { ORDER_STATUS } from 'data/orders/statuses';
//mport _ from 'lodash';
import { generateDelivery } from 'utils/order/generateDelivery';

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

  async createDraftOrder(numberOFProducts = 1) {
    const customer = await this.customersApiService.create();
    const product = await this.productsAPIService.create();
    const orderData: IOrderData = {
      customer: customer._id,
      products: []
    };
    for (let i = 1; i <= numberOFProducts; i++) {
      orderData.products.push(product._id);
    }
    const order = await this.create(orderData);
    return order;
  }

  async createDraftOrderWithDelivery() {
    const order = await this.createDraftOrder();
    const orderWithDelivery = await this.ordersController.updateDelivery(
      order._id,
      generateDelivery(),
      await this.signInApiService.getTransformedToken()
    );
    return orderWithDelivery.body.Order;
  }

  async createInProsessOrder() {
    const createdOrder = await this.createDraftOrderWithDelivery();
    const order = await this.ordersController.updateStatus({
      id: createdOrder._id,
      status: ORDER_STATUS.IN_PROCESS,
      token: await this.signInApiService.getTransformedToken()
    });
    return order.body.Order;
  }
  //create two random orders with Cancel and InProgress statuses (to check filters for example)
  async createRandomOrder() {
    const customer_1 = await this.customersApiService.create();
    const customer_2 = await this.customersApiService.create();
    const product_1 = await this.productsAPIService.create();
    const product_2 = await this.productsAPIService.create();
    let order_1 = await this.create({
      customer: customer_1._id,
      products: [product_1._id]
    });
    let order_2 = await this.create({
      customer: customer_2._id,
      products: [product_2._id, product_1._id]
    });

    order_1 = await this.updateStatus(order_1._id, ORDER_STATUS.CANCELLED);
    await this.updateDelivery(order_2._id);
    order_2 = await this.updateStatus(order_2._id, ORDER_STATUS.IN_PROCESS);

    const result = {
      order_1,
      order_2,
      product_1,
      product_2,
      customer_1,
      customer_2
    };
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

  async updateDelivery(id: string, delivery?: IDelivery) {
    const token = await this.signInApiService.getTransformedToken();
    if (!delivery) delivery = generateDelivery();
    const response = await this.ordersController.updateDelivery(
      id,
      delivery,
      token
    );
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Order;
  }

  async getByID(id: string) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.ordersController.getByID(id, token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Order;
  }
}
