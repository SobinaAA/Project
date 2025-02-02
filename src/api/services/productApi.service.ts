import { expect } from '@playwright/test';
import { STATUS_CODES } from '../../data/statusCodes';
import { SignInApiService } from './signInApi.service';
import { IProduct } from '../../data/types/product.types';
import { ProductsController } from '../controllers/products.controller';
import { generateProductData } from '../../data/products/generateProduct';
import {
  validateJsonSchema,
  validateResponse
} from '../../utils/validation/apiValidation';
import { IProductRequestParams } from '../../data/types/requestParams';
import { allProductsResponseSchema } from '../../data/jsonSchemas/product.schema';
import { oneProductResponseSchema } from '../../data/jsonSchemas/product.schema';

export class ProductsApiService {
  constructor(
    private productsController = new ProductsController(),
    private signInApiService = new SignInApiService()
  ) {}

  async getAll(params?: IProductRequestParams) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
    return response;
  }

  async create(customData?: Partial<IProduct>) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.create(
      generateProductData(customData),
      token
    );
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(oneProductResponseSchema, response);
    return response.body.Product;
  }

  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }
}
