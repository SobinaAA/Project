import { createProductTestDataPositive } from 'data/products/testProductsData/createProducts.data';
import { createProductTestDataNegative } from 'data/products/testProductsData/createProducts.data';
import { oneProductResponseSchema } from 'data/jsonSchemas/product.schema';
import { IProduct } from 'data/types/product.types';
import { expect, test } from 'fixtures/apiServices.fixture';

import _ from 'lodash';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';

test.describe('[API] [Products] [POST] [Positive]', async function () {
  let token = '';
  let id = '';

  test.beforeEach(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  createProductTestDataPositive.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ productsAPIController }) {
          const productResponse = await productsAPIController.create(
            data,
            token
          );
          validateResponse(productResponse, status, IsSuccess, ErrorMessage);
          id = productResponse.body.Product._id;
          validateJsonSchema(oneProductResponseSchema, productResponse);
          expect(
            _.omit(productResponse.body.Product, '_id', 'createdOn')
          ).toMatchObject({ ...data });
        }
      );
    }
  );

  test.afterEach(async function ({ productsAPIController }) {
    if (id) {
      await productsAPIController.delete(id, token);
    }
    id = '';
  });
});

test.describe('[API] [Products] [POST] [Negative]', async function () {
  let token = '';

  test.beforeEach(async function ({ signInApiService }) {
    token = await signInApiService.loginAsAdmin();
  });

  createProductTestDataNegative.forEach(
    ({ testName, tags, data, IsSuccess, ErrorMessage, status }) => {
      test(
        testName,
        { tag: [...tags] },
        async function ({ productsAPIController }) {
          const productResponse = await productsAPIController.create(
            data as unknown as IProduct,
            token
          );
          validateResponse(productResponse, status, IsSuccess, ErrorMessage);
          validateJsonSchema(validationErrorSchema, productResponse);
        }
      );
    }
  );
});
