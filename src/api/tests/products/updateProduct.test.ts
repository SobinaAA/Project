import {
  updateProductTestDataPositive,
  updateProductTestDataNegative
} from '../../../data/products/testProductsData/updateProducts.data';
import { oneProductResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { IProduct } from '../../../data/types/product.types';
import { expect, test } from '../../../fixtures/apiServices.fixture';

import _ from 'lodash';
import {
  validateResponse,
  validateJsonSchema
} from '../../../utils/validation/apiValidation';
import { validationErrorSchema } from '../../../data/jsonSchemas/validationError.shema';
import { generateProductData } from '../../../data/products/generateProduct';
import { STATUS_CODES } from '../../../data/statusCodes';
import { ERRORS } from '../../../data/errorMesages';
import { TAGS } from '../../../data/tags';

test.describe('[API] [Products] [PUT] [Positive]', async function () {
  let token = '';
  let productId = '';

  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  updateProductTestDataPositive.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ productsAPIController, productsAPIService }) {
          const createdProduct = await productsAPIService.create();
          const productResponse = await productsAPIController.update({
            id: createdProduct._id,
            token,
            body: generateProductData({
              ..._.omit(createdProduct, 'createdOn', '_id'),
              ...data
            })
          });
          validateResponse(productResponse, status, IsSuccess, ErrorMessage);
          productId = productResponse.body.Product._id;
          validateJsonSchema(oneProductResponseSchema, productResponse);
          expect(
            _.omit(productResponse.body.Product, '_id', 'createdOn')
          ).toMatchObject({ ...data });
        }
      );
    }
  );

  test.afterEach(async function ({ productsAPIService }) {
    if (productId) {
      await productsAPIService.delete(productId);
    }
    productId = '';
  });
});

test.describe('[API] [Products] [PUT] [Negative]', async function () {
  let token = '';
  let productId = '';

  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  updateProductTestDataNegative.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ productsAPIController, productsAPIService }) {
          const createdProduct = await productsAPIService.create();
          const productResponse = await productsAPIController.update({
            id: createdProduct._id,
            token: token,
            body: generateProductData({
              ..._.omit(createdProduct, 'createdOn', '_id'),
              ...(data as unknown as IProduct)
            })
          });
          validateResponse(productResponse, status, IsSuccess, ErrorMessage);
          productId = createdProduct._id;
          validateJsonSchema(validationErrorSchema, productResponse);
        }
      );
    }
  );

  test(
    'Should not update product with invalid Authorization token',
    { tag: ['@49PPU-API', TAGS.REGRESSION] },
    async function ({ productsAPIController, productsAPIService }) {
      const createdProduct = await productsAPIService.create();
      const updateResponse = await productsAPIController.update({
        id: createdProduct._id,
        token: '',
        body: generateProductData()
      });
      validateResponse(
        updateResponse,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, updateResponse);
    }
  );

  test(
    'Should not update product when name already exists (conflict error)',
    { tag: ['@50PPU-API', TAGS.REGRESSION] },
    async function ({ productsAPIController, productsAPIService }) {
      const firstProduct = await productsAPIService.create();
      const secondProduct = await productsAPIService.create();
      const updateResponse = await productsAPIController.update({
        id: secondProduct._id,
        token: token,
        body: { ...generateProductData(), name: firstProduct.name }
      });
      validateResponse(
        updateResponse,
        STATUS_CODES.CONFLICT,
        false,
        ERRORS.PRODUCT_CONFLICT(firstProduct.name)
      );
      validateJsonSchema(validationErrorSchema, updateResponse);
      await productsAPIService.delete(secondProduct._id);
    }
  );

  test(
    'Should not update product when ID does not exist',
    { tag: ['@51PPU-API', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const nonExistingId = '507f1f77bcf86cd799439011';
      const updateResponse = await productsAPIController.update({
        id: nonExistingId,
        token: token,
        body: { ...generateProductData(), name: 'Updated Product' }
      });
      validateResponse(
        updateResponse,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.PRODUCT_NOT_FOUND(nonExistingId)
      );
      validateJsonSchema(validationErrorSchema, updateResponse);
    }
  );

  test.afterEach(async function ({ productsAPIService }) {
    if (productId) {
      await productsAPIService.delete(productId);
    }
    productId = '';
  });
});
