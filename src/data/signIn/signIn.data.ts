import { STATUS_CODES } from 'data/statusCodes';
import { TAGS } from 'data/tags';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from 'config/env';
import { ERRORS } from 'data/errorMesages';

export const signInTestDataNegative = [
  {
    testName: 'Should fail to login with invalid email format',
    tags: ['@2AUTH-API', TAGS.REGRESSION],
    data: {
      username: 'invalid-email',
      password: ADMIN_PASSWORD
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_CREDENTIALS,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should fail to login with empty username',
    tags: ['@3AUTH-API', TAGS.REGRESSION],
    data: {
      username: '',
      password: ADMIN_PASSWORD
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_CREDENTIALS,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should fail to login with incorrect password',
    tags: ['@4AUTH-API', TAGS.REGRESSION],
    data: {
      username: ADMIN_USERNAME,
      password: 'WrongPassword'
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_CREDENTIALS,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should fail to login with empty password',
    tags: ['@5AUTH-API', TAGS.REGRESSION],
    data: {
      username: ADMIN_USERNAME,
      password: ''
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_CREDENTIALS,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should fail to login with missing required field',
    tags: ['@6AUTH-API', TAGS.REGRESSION],
    data: {
      username: ADMIN_USERNAME
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.LOGIN_ERROR,
    status: STATUS_CODES.INVALID_REQUEST
  }
];
