import { IUserCredentials } from 'data/types/user.types';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { TAGS } from 'data/tags';
import { validationErrorSchema } from 'data/jsonSchemas/validationError.shema';
import { signInTestDataNegative } from 'data/signIn/signIn.data';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from 'config/env';
import { STATUS_CODES } from 'data/statusCodes';
import { test} from "fixtures/apiServices.fixture";
import { expect } from 'chai';


test.describe('[API] [Auth] [POST] [Positive]', () => {
  test(
    'Should successfully login with valid credentials and receive token in headers',
    { tag: ['@1AUTH-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async ({signInController }) => {
      const adminCredentials: IUserCredentials = {
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD
      };

      const response = await signInController.login(adminCredentials);
      validateResponse(response, STATUS_CODES.OK, true, null);

      const token = response.headers['authorization'];
      expect(token).to.exist;
      expect(token).to.not.equal('');
    }
  );
});

test.describe('[API] [Auth] [POST] [Negative]', () => {

  signInTestDataNegative.forEach(
    ({ testName, tags, data, status, ErrorMessage }) => {
      test(testName, { tag: tags }, async ({ signInController } ) => {
        const response = await signInController.login(data as IUserCredentials);
        validateResponse(response, status, false, ErrorMessage);
        validateJsonSchema(validationErrorSchema, response);
      });
    }
  );
});
