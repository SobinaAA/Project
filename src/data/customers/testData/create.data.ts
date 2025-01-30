import { STATUS_CODES } from '../../statusCodes';
import { TAGS } from '../../tags';
import { generateNewCustomer } from '../generateCustomer';

export const createCustomerTestDataPositive = [
  {
    testName: 'Shoud create customer with smoke data',
    tags: ['@1PC-API', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateNewCustomer(),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  }
];
