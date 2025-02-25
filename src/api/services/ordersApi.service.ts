import { STATUS_CODES } from 'data/statusCodes';
import { SignInApiService } from 'api/services/signInApi.service';
import { IOrderRequestParams } from 'data/types/requestParams';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { OrdersAPIController } from 'api/controllers/orders.controller';
import {
  allOrdersResponseSchema,
  oneOrderSchema
} from 'data/jsonSchemas/order.schema';
import {
  IDelivery,
  IOrderData,
  IOrderFromResponse
} from 'data/types/orders.types';
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

  /**
   * @param {number} [numberOFProducts=1] - Количество продуктов в заказе (от 1 до 5).
   */
  async createDraftOrder(numberOFProducts = 1) {
    if (numberOFProducts < 1 || numberOFProducts > 5)
      throw new Error(
        `Unable to create Order with ${numberOFProducts} products`
      );
    const customer = await this.customersApiService.create();
    const product = await this.productsAPIService.create();
    const orderData: IOrderData = {
      customer: customer._id,
      products: []
    };
    if (
      typeof numberOFProducts !== 'number' ||
      numberOFProducts > 5 ||
      numberOFProducts < 1
    ) {
      throw new Error(`Incorrect number of Products`);
    }
    for (let i = 1; i <= numberOFProducts; i++) {
      orderData.products.push(product._id);
    }
    const order = await this.create(orderData);
    return order;
  }

  async createDraftOrderWithDelivery(numberOFProducts = 1) {
    const order = await this.createDraftOrder(numberOFProducts);
    const orderWithDelivery = await this.ordersController.updateDelivery(
      order._id,
      generateDelivery(),
      await this.signInApiService.getTransformedToken()
    );
    return orderWithDelivery.body.Order;
  }

  async createInProsessOrder(numberOFProducts = 1) {
    const createdOrder =
      await this.createDraftOrderWithDelivery(numberOFProducts);
    const order = await this.ordersController.updateStatus({
      id: createdOrder._id,
      status: ORDER_STATUS.IN_PROCESS,
      token: await this.signInApiService.getTransformedToken()
    });
    return order.body.Order;
  }

  /**
   * @param {number} [numberOFProducts=1] - Количество продуктов в заказе (от 1 до 5).
   */
  async createCanceledOrder(numberOFProducts = 1) {
    const createdOrder =
      await this.createDraftOrderWithDelivery(numberOFProducts);
    const order = await this.ordersController.updateStatus({
      id: createdOrder._id,
      status: ORDER_STATUS.CANCELLED,
      token: await this.signInApiService.getTransformedToken()
    });
    return order.body.Order;
  }

  /**
   * Creates an order in PARTIALLY_RECEIVED status with given number of products.
   * @param {number} [numberOFProducts=2] - Number of products in the order.
   * @returns {Promise<IOrder>} - The created order.
   * @throws {Error} - If numberOFProducts is less than 2 or more than 5.
   */
  async createOrderInPartiallyReceivedStatus(
    numberOFProducts = 2
  ): Promise<IOrderFromResponse> {
    if (numberOFProducts < 2 || numberOFProducts > 5)
      throw new Error(
        `Unable to create Partially Received Order with ${numberOFProducts} products`
      );
    const createdOrder = await this.createInProsessOrder(numberOFProducts);
    const response = await this.ordersController.receiveProducts(
      createdOrder._id,
      [createdOrder.products[0]._id],
      await this.signInApiService.getTransformedToken()
    );
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Order;
  }

  async receiveProducts(id: string, productIds: string[]) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.receiveProducts(
      id,
      productIds,
      token
    );
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneOrderSchema, response);
    return response;
  }

  /**
   * Creates an order in the "Received" status with the specified number of products.
   * This method first creates an order in the "In Process" status and then updates its status
   * to "Received" by receiving all products in the order.
   *
   * @param {number} numberOFProducts - The number of products to include in the order.
   * Defaults to 1.
   * @returns {Promise<IOrderFromResponse>} - A promise that resolves to the order object in the "Received" status.
   * @throws {Error} - If there is an error in creating or updating the order.
   */

  async createOrderInReceivedStatus(
    numberOFProducts = 1
  ): Promise<IOrderFromResponse> {
    const createdOrder = await this.createInProsessOrder(numberOFProducts);
    const response = await this.ordersController.receiveProducts(
      createdOrder._id,
      createdOrder.products.map((product) => product._id),
      await this.signInApiService.getTransformedToken()
    );
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Order;
  }

  //create two random orders with Cancel and InProgress statuses (to check filters for example)
  async createTwoRandomOrdersWithStatuses() {
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
  async createRandomOrder() {
    const customer = await this.customersApiService.create();
    const product = await this.productsAPIService.create();
    const order = await this.create({
      customer: customer._id,
      products: [product._id]
    });
    const result = {
      order,
      customer,
      product
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

  async addComment(id: string, text: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.addComment(id, text, token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(oneOrderSchema, response);
    return response.body.Order;
  }

  async deleteComment(order_id: string, comment_id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.ordersController.deleteComment(
      order_id,
      comment_id,
      token
    );
    validateResponse(response, STATUS_CODES.DELETED, true, null);
  }
}
