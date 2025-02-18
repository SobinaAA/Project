import { faker } from '@faker-js/faker';
import { STATUS_CODES } from 'data/statusCodes';
import { TAGS } from 'data/tags';

export const createCommentPositive = [
  {
    testName: 'Shoud create new comment with minimal text',
    tags: [
      '@1OComPos-API',
      '@alena-order-comments',
      TAGS.SMOKE,
      TAGS.REGRESSION
    ],
    text: '1',
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Shoud create new comment with some alphabet + numeric text (10-50 symbols)',
    tags: [
      '@2Order_Comments_Positive-API',
      '@alena-order-comments',
      TAGS.REGRESSION
    ],
    text: faker.string.alphanumeric({ length: { min: 10, max: 50 } }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Shoud create new comment with maximum large alphabet + numeric text (10-50 symbols)',
    tags: ['@3OComPos-API', '@alena-order-comments', TAGS.REGRESSION],
    text: faker.string.alphanumeric({ length: 250 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Shoud create new comment with some text containing signs (10-50 symbols)',
    tags: ['@4OComPos-API', '@alena-order-comments', TAGS.REGRESSION],
    text:
      faker.string.alphanumeric({ length: 50 }) +
      faker.string.symbol(15).replace('<', '').replace('>', ''),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Shoud create new comment with large text (1 symbol below upper value)',
    tags: ['@5OComPos-API', '@alena-order-comments', TAGS.REGRESSION],
    text: faker.string.alphanumeric({ length: 249 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  }
];
