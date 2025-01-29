import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import {
  ICustomer,
  ICustomerFromResponse,
  ICustomerResponse,
  ICustomersResponse
} from '../../data/types/customers.types';
import {
  ICustomerRequestParams,
  sortsASCDESC,
  sortsFieldCustomer
} from '../../data/types/requestParams';
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

  async sorting(
    arr: ICustomerFromResponse[],
    field: sortsFieldCustomer,
    dir: sortsASCDESC
  ) {
    let mySortedTable: ICustomerFromResponse[];
    switch (field) {
      case 'name':
        mySortedTable =
          dir === 'asc'
            ? arr.sort((prod1, prod2) =>
                prod1['name'].localeCompare(prod2['name'])
              )
            : arr.sort((prod1, prod2) =>
                prod2['name'].localeCompare(prod1['name'])
              );
        break;
      case 'country':
        mySortedTable =
          dir === 'asc'
            ? arr.sort((cust1, cust2) =>
                cust1['country'].localeCompare(cust2['country'])
              )
            : arr.sort((cust1, cust2) =>
                cust2['country'].localeCompare(cust1['country'])
              );
        break;
      case 'email':
        mySortedTable =
          dir === 'asc'
            ? arr.sort((cust1, cust2) =>
                cust1['email'].localeCompare(cust2['email'])
              )
            : arr.sort((cust1, cust2) =>
                cust2['email'].localeCompare(cust1['email'])
              );
        break;
      case 'createdOn':
        mySortedTable =
          dir === 'asc'
            ? arr.sort(
                (prod1, prod2) =>
                  Date.parse(prod1['createdOn']) -
                  Date.parse(prod2['createdOn'])
              )
            : arr.sort(
                (prod1, prod2) =>
                  Date.parse(prod2['createdOn']) -
                  Date.parse(prod1['createdOn'])
              );
        break;
      default:
        throw new Error('Другие методы пока не реализованы!');
    }
    return mySortedTable;
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
