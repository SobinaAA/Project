import { expect } from '@playwright/test';
import { STATUS_CODES } from '../../data/statusCodes';
import { SignInApiService } from './signInApi.service';
import { productResponseSchema } from '../../data/jsonSchemas/product.schema';
import { IProductFromResponse, IProduct } from '../../data/types/product.types';
import {
  validateResponse,
  validateJsonSchema
} from './validation/apiValidation';
import { ProductsController } from '../controllers/products.controller';
import { generateProductData } from '../../data/products/generateProduct';

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
    validateJsonSchema(productResponseSchema, response);
    this.createdProducts.push(response.body.Product);
    return response.body.Product;
  }

  removeStoredProduct(id?: string) {
    const index = id
      ? this.findProductIndex(id)
      : this.createdProducts.length - 1;
    this.createdProducts.splice(index, 1);
  }

  getAllStoredProduct() {
    console.log(this.createdProducts);
    return this.createdProducts;
  }

  async delete() {
    const token = await this.signInApiService.getTransformedToken();
    for (const product of this.createdProducts) {
      const response = await this.productsController.delete(product._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
    this.createdProducts = [];
  }

  private findProductIndex(id: string) {
    return this.createdProducts.findIndex((p) => p._id === id);
  }
}
