import { STATUS_CODES } from '../../../data/statusCodes';
import { expect, test } from '../../../fixtures/apiServices.fixture';
import { generateProductData } from '../../../data/products/generateProduct';
import { ERRORS } from '../../../data/errorMesages';
import { validateResponse } from '../../../utils/validation/apiValidation';
import { TAGS } from '../../../data/tags';

test.describe('[API] [Products] [DELETE the Product by Id]', async function () {
  let token = '';
  let productId = '';

  test.beforeEach(async ({ signInApiService }) => {
    await signInApiService.loginAsAdmin();
    token = await signInApiService.getTransformedToken();
  });

  test(
    '1DE-API] Should DELETE the product by valid Id',
    { tag: ['@1DE-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const product = (
        await productsAPIController.create(generateProductData(), token)
      ).body.Product;
      productId = product._id;
      const response = await productsAPIController.delete(productId, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
      expect(response.body).toBe('');
      const response2 = await productsAPIController.getById(productId, token);
      validateResponse(
        response2,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.PRODUCT_NOT_FOUND(productId)
      );
    }
  );

  test(
    '2DE-API] Should NOT DELETE the product by invalid Id',
    { tag: ['@2DE-API', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const response = await productsAPIController.delete(
        token,
        String(Date.now())
      );
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    '3DE-API] Should NOT DELETE the product without Id',
    { tag: ['@3DE-API', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const response = await productsAPIController.delete(token, '');
      validateResponse(
        response,
        STATUS_CODES.NOT_AUTHORIZED,
        false,
        ERRORS.NOT_AUTHORIZED
      );
    }
  );

  test(
    '4DE-API] Should NOT DELETE previously deleted product',
    { tag: ['@4DE-API', TAGS.REGRESSION] },
    async function ({ productsAPIController }) {
      const product = (
        await productsAPIController.create(generateProductData(), token)
      ).body.Product;
      productId = product._id;
      await productsAPIController.delete(productId, token);
      const response = await productsAPIController.delete(productId, token);
      validateResponse(
        response,
        STATUS_CODES.NOT_FOUND,
        false,
        ERRORS.PRODUCT_NOT_FOUND(productId)
      );
    }
  );
});
