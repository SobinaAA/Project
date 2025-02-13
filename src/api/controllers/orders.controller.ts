import {
  IDelivery,
  IOrderData,
  IOrderResponse,
  IOrdersResponse
} from 'data/types/orders.types';
import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import { IOrderRequestParams } from '../../data/types/requestParams';
import { convertRequestParams } from '../../utils/request';
import { RequestApi } from '../apiClient/request';
import { ORDER_STATUS } from 'data/orders/statuses';

export class OrdersAPIController {
  constructor(private request = new RequestApi()) {}

  async create(data: IOrderData, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Orders,
      method: 'post',
      data: data,
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    };
    return await this.request.send<IOrderResponse>(options);
  }

  async getAll(token: string, params?: IOrderRequestParams) {
    let urlParams = '';
    if (params) {
      urlParams = convertRequestParams(params as Record<string, string>);
    }
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      url: apiConfig.endpoints.Orders + urlParams,
      baseURL: apiConfig.baseUrl
    };
    const result = await this.request.send<IOrdersResponse>(options);
    return result;
  }

  async getByID(id: string, token: string) {
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      url: apiConfig.endpoints['Get Order By Id'](id)
    };
    const result = await this.request.send<IOrderResponse>(options);
    return result;
  }

  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Get Order By Id'](id),
      method: 'delete',
      headers: {
        Authorization: token
      }
    };

    return await this.request.send<null>(options);
  }

  async updateStatus(data: {
    id: string;
    status: ORDER_STATUS;
    token: string;
  }) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Status Order By Id'](data.id),
      method: 'put',
      data: { status: data.status },
      headers: {
        'content-type': 'application/json',
        Authorization: data.token
      }
    };
    return await this.request.send<IOrderResponse>(options);
  }

  async updateDelivery(id: string, delivery: IDelivery, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Status Delivery By Id'](id),
      method: 'post',
      data: delivery,
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    };
    return await this.request.send<IOrderResponse>(options);
  }

  async addComment(id: string, text: string, token: string) {
    const comment = {
      comment: text
    };
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Comment Order By Id'](id),
      method: 'post',
      data: comment,
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    };
    return await this.request.send<IOrderResponse>(options);
  }

  async deleteComment(order_id: string, comment_id: string, token: string) {
    const options: IRequestOptions = {
      url:
        apiConfig.endpoints['Comment Order By Id'](order_id) + `/${comment_id}`,
      method: 'delete',
      headers: {
        Authorization: token
      }
    };
    return await this.request.send<IOrderResponse>(options);
  }
}
