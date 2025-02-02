import { STATUS_CODES } from '../../../data/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { simpleFaker } from '@faker-js/faker';

import {
  sortFieldProduct,
  sortDir,
  sortsASCDESC,
  sortsFieldProduct
} from '../../../data/types/requestParams';

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
import { TAGS } from '../../../data/tags';

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

  test(
    '[1P-API] Should GET the complete list of products without sorting and filtering ',
    { tag: ['@1P-API', '@alena-products', TAGS.REGRESSION, TAGS.SMOKE] },
    async function ({ productsAPIService }) {
      await productsAPIService.getAll(token);
    }
  );

  let i = 2;
  for (const keyField in _.omit(sortFieldProduct, ['createdOn'])) {
    const tag = `@${i}C-API`;
    i++;
    test(
      `Should GET products filtred by ${keyField}`,
      { tag: [tag, '@alena-products', TAGS.REGRESSION] },
      async function ({ productsAPIService }) {
        const searchParam = product_1[keyField] + '';
        const response = await productsAPIService.getAll(token, {
          search: searchParam
        });
        expect(
          response.body.Products.some((prod) => prod._id === product_1._id),
          'Should find 1st product in the list'
        ).toBe(true);
      }
    );
  }

  test(
    '[5P-API] Should GET products filtred by Manufacturer',
    { tag: ['@6P-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIService }) {
      const response = await productsAPIService.getAll(token, {
        manufacturer: product_1.manufacturer
      });
      expect(
        response.body.Products.some((prod) => prod._id === product_1._id),
        'Should find 1st product in the list'
      ).toBe(true);
    }
  );

  i = 6;
  for (const keyField in sortFieldProduct) {
    for (const keyDir in sortDir) {
      const tag = `@${i}C-API`;
      i++;
      test(
        `Should GET products sorted by ${keyField} in ${keyDir} order`,
        { tag: [tag, '@alena-products', TAGS.REGRESSION] },
        async function ({ productsAPIService }) {
          const response = await productsAPIService.getAll(token, {
            sortField: keyField as sortsFieldProduct,
            sortOrder: keyDir as sortsASCDESC
          });
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
        }
      );
    }
  }

  test(
    '[14P-API] Should NOT GET the full list of products with empty authorization token',
    { tag: ['@14P-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const response = await productsAPIController.getAll('');
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(simpleSchemaPart, response);
    }
  );

  test(
    '[15P-API] Should NOT GET the full list of products with incorrect authorization token',
    { tag: ['@15P-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const incorrect_token = token.slice(13) + Date.now();
      const response = await productsAPIController.getAll(incorrect_token);
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(simpleSchemaPart, response);
    }
  );

  test(
    'Should GET full list of products with invalid value for filtering by the Manufacturer field',
    { tag: ['@16C-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIService }) {
      const response = await productsAPIService.getAll(token, {
        manufacturer: `${simpleFaker.string.alphanumeric(7)}`
      });
      expect(
        response.body.Products.length,
        'Should get 0 products (empty list)'
      ).toBe(0);
    }
  );

  test(
    'Should GET an empty list of products by setting strict search string conditions',
    { tag: ['@17P-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIService }) {
      const response = await productsAPIService.getAll(token, {
        search: `${simpleFaker.string.alphanumeric(10)}`
      });
      expect(
        response.body.Products.length,
        'Should get 0 products (empty list)'
      ).toBe(0);
    }
  );

  test(
    'Should GET not sorted products list (incorrect sort field)',
    { tag: ['@18P-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIService }) {
      await productsAPIService.getAll(token, {
        sortField: simpleFaker.string.alphanumeric(
          5
        ) as unknown as sortsFieldProduct,
        sortOrder: 'asc'
      });
    }
  );

  test(
    'Should GET not sorted products list (incorrect sort order)',
    { tag: ['@19P-API', '@alena-products', TAGS.REGRESSION] },
    async function ({ productsAPIService }) {
      await productsAPIService.getAll(token, {
        sortField: 'name',
        sortOrder: simpleFaker.string.alphanumeric(4) as unknown as sortsASCDESC
      });
    }
  );

  test.afterAll(async ({ productsAPIController }) => {
    if (product_1._id) await productsAPIController.delete(product_1._id, token);
    if (product_2._id) await productsAPIController.delete(product_1._id, token);
  });
});
