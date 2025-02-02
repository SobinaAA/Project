import { test } from '@playwright/test';
import { SignInController } from '../controllers/signIn.controller';
import { IUserCredentials } from '../../data/types/user.types';
import {
  validateResponse,
  validateJsonSchema
} from '../../utils/validation/apiValidation';
import { TAGS } from '../../data/tags';
import { validationErrorSchema } from '../../data/jsonSchemas/validationError.shema';
import { expect } from 'chai';
import { SignInApiService } from '../services/signInApi.service';
import { signInTestDataNegative} from "../../data/signIn/signIn.data";

test.describe('[API] [Auth] [POST] [Positive]', () => {
  const signInApiService = new SignInApiService();

  test(
    'Should successfully login with valid credentials',
    { tag: ['@1AUTH-API', TAGS.SMOKE, TAGS.REGRESSION] },
    async () => {
      const token = await signInApiService.loginAsAdmin()
      expect(token).to.exist;
      expect(token).to.not.equal('');
      expect(token).contain('Bearer ');
    }
  );
});

test.describe('[API] [Auth] [POST] [Negative]', () => {
  let signInController: SignInController;

  test.beforeAll(() => {
    signInController = new SignInController();
  });

  signInTestDataNegative.forEach(({ testName, tags, data, status, ErrorMessage }) => {
    test(
      testName,
      { tag: tags },
      async () => {
        const response = await signInController.login(data as IUserCredentials);
        validateResponse(response, status, false, ErrorMessage);
        validateJsonSchema(validationErrorSchema, response);
      }
    );
  });
});
