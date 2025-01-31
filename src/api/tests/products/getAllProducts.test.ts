import { STATUS_CODES } from '../../../data/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { simpleFaker } from '@faker-js/faker';

import {
  sortFieldProduct,
  sortDir,
  sortsASCDESC,
  sortsFieldProduct
} from '../../../data/types/requestParams';

import { allProductsResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { IProductFromResponse } from '../../../data/types/product.types';
import { generateProductData } from '../../../data/products/generateProduct';
import { simpleSchemaPart } from '../../../data/jsonSchemas/base.schema';
import _ from 'lodash';
import { ERRORS } from '../../../data/errorMesages';
import { sorting } from '../../../utils/products/sorting';
import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';

let token: string;
let product_1: IProductFromResponse;
let product_2: IProductFromResponse;

test.describe('[API] [Products] [Sorting and filtering list of the Products]', async function () {
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

  test('[1P-API] Should GET the complete list of products without sorting and filtering ', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
  });

  for (const keyField in _.omit(sortFieldProduct, ['createdOn'])) {
    test(`[2P-API] - [4P-API] Should GET products filtred by ${keyField}`, async function ({
      productsAPIController
    }) {
      const searchParam = product_1[keyField] + '';
      const response = await productsAPIController.getAll(token, {
        search: searchParam
      });
      validateResponse(response, STATUS_CODES.OK, true, null);
      validateJsonSchema(allProductsResponseSchema, response);
      expect(
        response.body.Products.some((prod) => prod._id === product_1._id),
        'Should find 1st product in the list'
      ).toBe(true);
    });
  }

  test('[5P-API] Should GET products filtred by Manufacturer', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token, {
      manufacturer: product_1.manufacturer
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
    expect(
      response.body.Products.some((prod) => prod._id === product_1._id),
      'Should find 1st product in the list'
    ).toBe(true);
  });

  for (const keyField in sortFieldProduct) {
    for (const keyDir in sortDir) {
      test(`[6P-API] - [13P-API] Should GET products sorted by ${keyField} in ${keyDir} order`, async function ({
        productsAPIController
      }) {
        const response = await productsAPIController.getAll(token, {
          sortField: keyField as sortsFieldProduct,
          sortOrder: keyDir as sortsASCDESC
        });
        validateResponse(response, STATUS_CODES.OK, true, null);
        validateJsonSchema(allProductsResponseSchema, response);
        const sortedResponse = sorting(
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
          ),
          'Should match our and default sorting'
        ).toBe(true);
      });
    }
  }

  test('[14P-API] Should NOT GET the full list of products with empty authorization token', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll('');
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(simpleSchemaPart, response);
  });

  test('[15P-API] Should NOT GET the full list of products with incorrect authorization token', async function ({
    productsAPIController
  }) {
    const incorrect_token = token.slice(13) + Date.now();
    const response = await productsAPIController.getAll(incorrect_token);
    validateResponse(
      response,
      STATUS_CODES.NOT_AUTHORIZED,
      false,
      ERRORS.NOT_AUTHORIZED
    );
    validateJsonSchema(simpleSchemaPart, response);
  });

  test('[16P-API] Should GET full list of products with invalid value for filtering by the Manufacturer field', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token, {
      manufacturer: `${simpleFaker.string.alphanumeric(7)}`
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
    expect(
      response.body.Products.length,
      'Should get 0 products (empty list)'
    ).toBe(0);
  });

  test('[17P-API] Should GET an empty list of products by setting strict search string conditions', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token, {
      search: `${simpleFaker.string.alphanumeric(10)}`
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
    expect(
      response.body.Products.length,
      'Should get 0 products (empty list)'
    ).toBe(0);
  });

  test('[18C-API] Should GET not sorted products list (incorrect sort field)', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token, {
      sortField: simpleFaker.string.alphanumeric(5) as unknown as sortsFieldProduct,
      sortOrder: 'asc'
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
  });

  test('[19C-API] Should GET not sorted products list (incorrect sort order)', async function ({
    productsAPIController
  }) {
    const response = await productsAPIController.getAll(token, {
      sortField: 'name',
      sortOrder: simpleFaker.string.alphanumeric(4) as unknown as sortsASCDESC
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
  });

  test.afterAll(async ({ productsAPIController }) => {
    await productsAPIController.delete(product_1._id, token);
    await productsAPIController.delete(product_2._id, token);
  });
});
