import { STATUS_CODES } from 'data/statusCodes';
import { SignInApiService } from 'api/services/signInApi.service';
import { IProduct, IProductFromResponse } from 'data/types/product.types';
import { ProductsController } from 'api/controllers/products.controller';
import { generateProductData } from 'data/products/generateProduct';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { IProductRequestParams } from 'data/types/requestParams';
import { allProductsResponseSchema } from 'data/jsonSchemas/product.schema';
import { oneProductResponseSchema } from 'data/jsonSchemas/product.schema';

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
    validateResponse(response, STATUS_CODES.DELETED);
  }

  async deleteByName(name: string): Promise<void> {
    const response = await this.getAll();
    const products = response.body.Products as IProductFromResponse[];
    const product = products.find((p) => p.name.trim() === name.trim());
    if (product) {
      await this.delete(product._id);
    }
  }
}
