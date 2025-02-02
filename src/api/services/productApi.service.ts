import { expect } from '@playwright/test';
import { STATUS_CODES } from '../../data/statusCodes';
import { SignInApiService } from './signInApi.service';
import { IProductFromResponse, IProduct } from '../../data/types/product.types';

import { ProductsController } from '../controllers/products.controller';
import { generateProductData } from '../../data/products/generateProduct';
import {
  validateJsonSchema,
  validateResponse
} from '../../utils/validation/apiValidation';
import { IProductRequestParams } from '../../data/types/requestParams';
import { allProductsResponseSchema } from '../../data/jsonSchemas/product.schema';

export class ProductsApiService {
  private createdProducts: IProductFromResponse[] = [];
  constructor(
    private productsController = new ProductsController(),
    private signInApiService = new SignInApiService()
  ) {}

  async create(customData?: Partial<IProduct>) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.create(
      generateProductData(customData),
      token
    );
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    //validateJsonSchema(productResponseSchema, response);
    this.createdProducts.push(response.body.Product);
    return response.body.Product;
  }

  async getAll(token: string, params?: IProductRequestParams) {
    const response = await this.productsController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
    return response;
  }

  removeStoredProduct(id?: string) {
    const index = id
      ? this.findProductIndex(id)
      : this.createdProducts.length - 1;
    this.createdProducts.splice(index, 1);
  }

  getAllStoredProduct() {
    return this.createdProducts;
  }

  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  private findProductIndex(id: string) {
    return this.createdProducts.findIndex((p) => p._id === id);
  }
}
