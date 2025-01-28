import { STATUS_CODES } from '../../../data/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';

import {
  sortFieldProduct,
  sortDir,
  sortsASCDESC,
  sortsFieldProduct
} from '../../../data/types/requestParams';
import {
  validateJsonSchema,
  validateResponse
} from '../../services/validation/apiValidation';
import { allProductsResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { IProductFromResponse } from '../../../data/types/product.types';
import { generateProductData } from '../../../data/products/generateProduct';

test.describe('[API] [Products] [Sorting and filtering list of the Products]', async function () {
  let token: string;
  let product_1: IProductFromResponse;
  let product_2: IProductFromResponse;

  test.beforeAll(async ({ signInApiService, productsAPIController }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
    product_1 = (
      await productsAPIController.create(generateProductData(), token)
    ).body.Product;
    product_2 = (
      await productsAPIController.create(generateProductData(), token)
    ).body.Product;
  });

  test.only('[1P-API] GET the complete list of products without sorting and filtering ', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
  });

  for (const keyField in sortFieldProduct) {
    for (const keyDir in sortDir) {
      test(`Should get products sorted by ${keyField} in ${keyDir} order`, async function ({
        productsAPIController
      }) {
        const response = await productsAPIController.getAll(token, {
          sortField: keyField,
          sortOrder: keyDir as sortsASCDESC
        });
        validateResponse(response, STATUS_CODES.OK, true, null);
        validateJsonSchema(allProductsResponseSchema, response);
        const sortedResponse = await productsAPIController.sorting(
          response.body.Products,
          keyField as sortsFieldProduct,
          keyDir as sortsASCDESC
        );
        expect(
          sortedResponse.every(
            (p, i) =>
              p[keyField as keyof typeof sortFieldProduct] ===
              response.body.Products[i][
                keyField as keyof typeof sortFieldProduct
              ]
          )
        ).toBe(true);
      });
    }
  }

  test.afterAll(async ({ productsAPIController }) => {
    await productsAPIController.delete(product_1._id, token);
    await productsAPIController.delete(product_2._id, token);
  });
});
