import { STATUS_CODES } from 'data/statusCodes';
import { SignInApiService } from 'api/services/signInApi.service';
import { IProduct } from 'data/types/product.types';
import { ProductsController } from 'api/controllers/products.controller';
import { generateProductData } from 'data/products/generateProduct';
import {
  validateJsonSchema,
  validateResponse
} from 'utils/validation/apiValidation';
import { IProductRequestParams } from 'data/types/requestParams';
import { allProductsResponseSchema } from 'data/jsonSchemas/product.schema';
import { oneProductResponseSchema } from 'data/jsonSchemas/product.schema';
import { logStep } from 'utils/report/logStep';

export class ProductsApiService {
  constructor(
    private productsController = new ProductsController(),
    private signInApiService = new SignInApiService()
  ) {}

  @logStep('Get all products via API')
  async getAll(params?: IProductRequestParams) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
    return response;
  }

  @logStep('Get one product via API')
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

  @logStep('Delete product via API')
  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.productsController.delete(id, token);
    validateResponse(response, STATUS_CODES.DELETED);
  }
}
