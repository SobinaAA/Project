import { IOrdersResponse } from 'data/types/orders.types';
import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import { IOrderRequestParams } from '../../data/types/requestParams';
import { convertRequestParams } from '../../utils/request';
import { RequestApi } from '../apiClient/request';

export class OrdersAPIController {
  constructor(private request = new RequestApi()) {}

  // async create(body: ICustomer, token: string) {
  //   const options: IRequestOptions = {
  //     url: apiConfig.endpoints.Customers,
  //     method: 'post',
  //     data: body,
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: token
  //     }
  //   };

  //   return await this.request.send<ICustomerResponse>(options);
  // }

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

  // async getByID(id: string, token: string) {
  //   const options: IRequestOptions = {
  //     method: 'get',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: token
  //     },
  //     url: apiConfig.endpoints['Get Customer By Id'](id)
  //   };
  //   const result = await this.request.send<ICustomerResponse>(options);
  //   return result;
  // }

  // async delete(id: string, token: string) {
  //   const options: IRequestOptions = {
  //     url: apiConfig.endpoints['Get Customer By Id'](id),
  //     method: 'delete',
  //     headers: {
  //       Authorization: token
  //     }
  //   };

  //   return await this.request.send<null>(options);
  // }

  // async update(data: { id: string; token: string; body: ICustomer }) {
  //   const options: IRequestOptions = {
  //     url: apiConfig.endpoints['Get Customer By Id'](data.id),
  //     method: 'put',
  //     data: data.body,
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: data.token
  //     }
  //   };

  //   return await this.request.send<ICustomerResponse>(options);
  // }
}
