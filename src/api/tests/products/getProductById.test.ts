import { STATUS_CODES } from 'data/statusCodes';
import { test } from 'fixtures/apiServices.fixture';
import { oneProductResponseSchema } from 'data/jsonSchemas/product.schema';
import { generateProductData } from 'data/products/generateProduct';
import { ERRORS } from 'data/errorMesages';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';
import { TAGS } from 'data/tags';

test.describe('[API] [Products] [Get the Product by Id]', async function () {
  let token = '';
  let productId = '';

  test.beforeEach(async ({ signInApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
  });

  test.afterEach(async function ({ productsAPIService }) {
    if (productId) {
      await productsAPIService.delete(productId);
    }
    productId = '';
  });

  test(
    '1GE-API] Should GET the product by valid Id ',
    { tag: ['@1GE-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const product = (
        await productsAPIController.create(generateProductData(), token)
      ).body.Product;
      productId = product._id;
      const response = await productsAPIController.getById(productId, token);
      validateResponse(response, STATUS_CODES.OK, true, null);
      validateJsonSchema(oneProductResponseSchema, response);
    }
  );

  test(
    '2GE-API] Should NOT GET the product by invalid Id ',
    { tag: ['@2GE-API', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const response = await productsAPIController.getById(
        token,
        String(Date.now())
      );
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, response);
    }
  );

  test(
    '3GE-API] Should NOT GET the product without Id ',
    { tag: ['@3GE-API', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const response = await productsAPIController.getById(token, '');
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
      validateJsonSchema(validationErrorSchema, response);
    }
  );
});
