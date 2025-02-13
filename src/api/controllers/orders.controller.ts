import { apiConfig } from '../../config/apiConfig';
import { IOrderResponse } from '../../data/types/orders.types';
import { IRequestOptions } from '../../data/types/api.types';
import { RequestApi } from '../apiClient/request';

export class OrdersController {
  constructor(private request = new RequestApi()) {}

  async getById(orderId: string, token: string) {
    const url = `${apiConfig.endpoints.Orders}/${orderId}`;
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      url: url,
      baseURL: apiConfig.baseUrl
    };
    const result = await this.request.send<IOrderResponse>(options);
    return result;
  }

  async delete(orderId: string, token: string) {
    const options: IRequestOptions = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      url: apiConfig.endpoints['Order Delete'](orderId)
    };
    return await this.request.send<null>(options);
  }
}
