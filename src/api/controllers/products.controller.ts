import { apiConfig } from '../../config/apiConfig';
import {
  IProduct,
  IProductResponse,
  IProductsResponse
} from '../../data/types/product.types';
import { IRequestOptions } from '../../data/types/api.types';
import { IProductRequestParams } from '../../data/types/requestParams';
import { convertRequestParams } from '../../utils/request';
import { RequestApi } from '../apiClient/request';

export class ProductsController {
  constructor(private request = new RequestApi()) {}

  //@logStep("Create Product via API")
  async create(productData: IProduct, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Products,
      baseURL: apiConfig.baseUrl,
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      data: productData
    };
    return await this.request.send<IProductResponse>(options);
  }

  async getAll(token: string, params?: IProductRequestParams) {
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
      url: apiConfig.endpoints.Products + urlParams,
      baseURL: apiConfig.baseUrl
    };
    const result = await this.request.send<IProductsResponse>(options);
    return result;
  }

  async delete(productId: string, token: string) {
    const options: IRequestOptions = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      },
      url: apiConfig.endpoints['Get Product By Id'](productId)
    };
    return await this.request.send(options);
  }
}
