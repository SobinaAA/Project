import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import {
  ICustomer,
  ICustomerResponse,
  ICustomersResponse
} from '../../data/types/customers.types';
import { ICustomerRequestParams } from '../../data/types/requestParams';
import { convertRequestParams } from '../../utils/request';
import { RequestApi } from '../apiClient/request';

export class CustomersAPIController {
  constructor(private request = new RequestApi()) {}

  async create(body: ICustomer, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Customers,
      method: 'post',
      data: body,
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    };

    return await this.request.send<ICustomerResponse>(options);
  }

  async getAll(token: string, params?: ICustomerRequestParams) {
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
      url: apiConfig.endpoints.Customers + urlParams,
      baseURL: apiConfig.baseUrl
    };
    const result = await this.request.send<ICustomersResponse>(options);
    return result;
  }

  async getByID(id: string, token: string) {
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      url: apiConfig.endpoints['Get Customer By Id'](id)
    };
    const result = await this.request.send<ICustomerResponse>(options);
    return result;
  }

  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints['Get Customer By Id'](id),
      method: 'delete',
      headers: {
        Authorization: token
      }
    };

    return await this.request.send(options);
  }
}
