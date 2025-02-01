import _ from 'lodash';
import { ERRORS } from '../../errorMesages';
import { STATUS_CODES } from '../../statusCodes';
import { TAGS } from '../../tags';
import { generateProductData } from '../generateProduct';

export const createProductTestDataPositive = [
  {
    testName: 'Should create product with smoke data',
    tags: ['@1PPO-API', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateProductData(),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with valid name',
    tags: ['@2PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Valid Name' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create products with 3 symbols in name',
    tags: ['@3PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'aBc' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create products with 4 symbols in name',
    tags: ['@4PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'aBcd' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create products with 39 symbols in name',
    tags: ['@5PPO-API', TAGS.REGRESSION],
    data: generateProductData({
      name: 'cojbhkwergnL bqgpkdbpiosvpsdqnivexsmlgo'
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create products with 40 symbols in name',
    tags: ['@6PPO-API', TAGS.REGRESSION],
    data: generateProductData({
      name: 'bkzachhsejzgfnjdvZ hlqdcbqkfarjmswtdjldq'
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with name containing numbers',
    tags: ['@7PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product987' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with name containing spaces',
    tags: ['@8PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product 1 Test' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with number 1 in price',
    tags: ['@9PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: 1 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with number 5000 in price',
    tags: ['@10PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: 5000 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with number 99999 in price',
    tags: ['@11PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: 99999 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with number 0 in amount',
    tags: ['@12PPO-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 0 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with number 999 in amount',
    tags: ['@13PPO-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 999 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with number 500 in amount',
    tags: ['@14PPO-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 500 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with valid notes',
    tags: ['@15PPO-API', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Valid Notes' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product without notes',
    tags: ['@16PPO-API', TAGS.REGRESSION],
    data: _.omit(generateProductData(), 'notes'),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with 1 symbols in notes',
    tags: ['@17PPO-API', TAGS.REGRESSION],
    data: generateProductData({ notes: 'A' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with 125 symbols in notes',
    tags: ['@18PPO-API', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'pywcjivphxnlvifhbmzkumzvjmkawqqgxcmthiakxnzwvbeyyrsumsygrogcefdjtwojgkdcecilttvefdrpxehkgpvmdsibofkywrdgijpkqspxurzihurpeezmh'
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with 250 symbols in notes',
    tags: ['@19PPO-API', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'omelsteekrzrcpnuaasfunzczhnuvnmibbzctwriqnhnoeodpprwagrzasidzvnohzabwaxuhpvozojhjkkskmptzryrvicfbasphvuudnwopeglznsfpjaqjgyocwxuqpnuzlgxeeaixbiqtgsvqlkmihmwesbnfvjkxdewwgjkmwivlaraismrceingvjbsrybxtuxoabbfdngblosdhdrhybjrhbtjcrbtvnacadjeakhqwvrvficfb'
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Should create product with special characters in notes',
    tags: ['@20PPO-API', TAGS.REGRESSION],
    data: generateProductData({ notes: '! @ # $ % ^ & * ( ) _ + - = [ ] { }' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'POST a product with notes containing non-Latin characters',
    tags: ['@21PPO-API', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Примечания' }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  }
];

export const createProductTestDataNegative = [
  {
    testName: 'POST a product without name',
    tags: ['@22PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: '' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a name shorter than 3 characters',
    tags: ['@23PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'ab' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a name longer than 40 characters',
    tags: ['@24PPO-API', TAGS.REGRESSION],
    data: generateProductData({
      name: 'Zuitmmws gnltfhcdflwjdyacwtleqrbhllkioxcp'
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a name containing special characters',
    tags: ['@25PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product@!' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'POST a product with a name containing multiple consecutive spaces',
    tags: ['@26PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product  1' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a name containing non-Latin characters',
    tags: ['@27PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Продукт1' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST the product with a name containing a postfix space',
    tags: ['@28PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: ' Product1' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST the product with a name containing a prefix space',
    tags: ['@29PPO-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product1 ' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a price below the minimum',
    tags: ['@30PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: 0 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a price above the maximum',
    tags: ['@31PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: 100000 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a negative price',
    tags: ['@32PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: -10 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a non-integer price (decimal)',
    tags: ['@33PPO-API', TAGS.REGRESSION],
    data: generateProductData({ price: 99.99 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a non-numeric price',
    tags: ['@34PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: 'invalidPrice' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a price containing leading zeros',
    tags: ['@35PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '0123' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'POST a product with a price containing a six-digit number with leading zeros',
    tags: ['@36PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '012345' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a price containing spaces',
    tags: ['@37PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '1 1' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a price containing special characters',
    tags: ['@38PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '111!' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product without a number in the price field',
    tags: ['@39PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with an amount above the maximum',
    tags: ['@40PPO-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 1000 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a negative amount',
    tags: ['@41PPO-API', TAGS.REGRESSION],
    data: generateProductData({ amount: -10 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a non-integer amount',
    tags: ['@42PPO-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 100.5 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a non-numeric amount',
    tags: ['@43PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: 'invalidAmount' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with an amount containing leading zeros',
    tags: ['@44PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '012' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with an amount containing spaces',
    tags: ['@45PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '1 1' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with an amount containing special characters',
    tags: ['@46PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '11!' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product without a number in the amount field',
    tags: ['@47PPO-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'POST a product with a notes field exceeding the allowed length',
    tags: ['@49PPO-API', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'btijjrjrrzlrkikjhgvzynpazoigdbvcnkyzxgxiwdilrtpwbdugtnosbemcqisvvtyxacblxjqhebcmhoacdllxpvxsqjvvzsnfbiufbseouqvbgzjyixlnijqeuqqzccnskmpskzocotcksbjafqececlspqxifiocekaufjntcjmgshxrxkgvagtokchbwsfmugkobpwvifgspwzwcoskyibxigfjuvlvhxtakmicibpskvuhohuhxuz'
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: "POST a product with '<>' symbol in notes",
    tags: ['@50PPO-API', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Test <>' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  }
];
