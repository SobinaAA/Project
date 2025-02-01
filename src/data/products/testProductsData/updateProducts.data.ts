import { STATUS_CODES } from '../../statusCodes';
import { ERRORS } from '../../errorMesages';
import { TAGS } from '../../tags';
import { generateProductData } from '../generateProduct';

export const updateProductTestDataPositive = [
  {
    testName: 'Should update product with valid data (smoke update)',
    tags: ['@1PPU-API', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateProductData(),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with a valid name',
    tags: ['@2PPU-API', TAGS.REGRESSION],
    data: { name: 'Valid Name Test' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with the minimum valid name length (e.g. "aBc")',
    tags: ['@3PPU-API', TAGS.REGRESSION],
    data: { name: 'cDf' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with a name slightly above the minimum length',
    tags: ['@4PPU-API', TAGS.REGRESSION],
    data: { name: 'cDfG' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with a name just below the maximum length (39 characters)',
    tags: ['@5PPU-API', TAGS.REGRESSION],
    data: { name: 'cojbhkwergnL bqgpkdbpiosvpsdqnivexsmlgo' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with the maximum allowed name length (40 characters)',
    tags: ['@6PPU-API', TAGS.REGRESSION],
    data: { name: 'bkzachhsejzgfnjdvZ hlqdcbqkfarjmswtdjldq' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with a name that includes numbers',
    tags: ['@7PPU-API', TAGS.REGRESSION],
    data: { name: 'Product456' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with a name that includes spaces',
    tags: ['@8PPU-API', TAGS.REGRESSION],
    data: { name: 'Product 1 Test' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with the minimum valid price',
    tags: ['@9PPU-API', TAGS.REGRESSION],
    data: { price: 1 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with an average valid price',
    tags: ['@10PPU-API', TAGS.REGRESSION],
    data: { price: 5000 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with the maximum valid price',
    tags: ['@11PPU-API', TAGS.REGRESSION],
    data: { price: 99999 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with the minimum valid amount',
    tags: ['@12PPU-API', TAGS.REGRESSION],
    data: { amount: 0 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with the maximum valid amount',
    tags: ['@13PPU-API', TAGS.REGRESSION],
    data: { amount: 999 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with an average valid amount',
    tags: ['@14PPU-API', TAGS.REGRESSION],
    data: { amount: 500 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with a valid notes value',
    tags: ['@15PPU-API', TAGS.REGRESSION],
    data: { notes: 'Valid Notes' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product without notes',
    tags: ['@16PPU-API', TAGS.REGRESSION],
    data: { notes: '' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Should update product with the minimum valid notes length',
    tags: ['@17PPU-API', TAGS.REGRESSION],
    data: { notes: 'A' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with an average valid notes value (125 characters)',
    tags: ['@18PPU-API', TAGS.REGRESSION],
    data: {
      notes:
        'lowgqcpcoedwxveyowhfvrnhazbrmxlzvsyrnbedhfrjlvjhM nwtkbszvglqldwiytoumyxgaazsplnyivjfpoanllwsyofjsgkecngvcfqzrbijwsgnzpoiyryl'
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with the maximum allowed notes length (250 characters)',
    tags: ['@19PPU-API', TAGS.REGRESSION],
    data: {
      notes:
        'yiosgdspvllqudodqtkdwzrzaxiegwnsurghpgrzftuguwmjwckykfeaocvfgsulokeeeapvfpguguqvnvausvrlpqnbzgpxxcsfizzueckgnehyezhrgwiecfbqsemqitcgtacfqxsnharksayuvbutpmxneuwdsbrxttjyumpoojhF spmbrjsqjtkfnvmdmvtixkysizffgcstnoelocvfktonvrmxirjnhydyudwxeijbeqcnkykpv'
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName:
      'Should update product with special characters in the notes field',
    tags: ['@20PPU-API', TAGS.REGRESSION],
    data: { notes: '! @ # $ % ^ & * ( ) _ + - = [ ] { }' },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  }
];

export const updateProductTestDataNegative = [
  {
    testName: 'Should not update product when name is missing',
    tags: ['@21PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: ' ' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when name is shorter than 3 characters',
    tags: ['@22PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'ab' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when name is longer than 40 characters',
    tags: ['@23PPU-API', TAGS.REGRESSION],
    data: generateProductData({
      name: 'bcwugjmttnsjyvmrwE nynrydyybmlyrtyxmwvvva'
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when name contains special characters',
    tags: ['@24PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product@!' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when name contains multiple consecutive spaces',
    tags: ['@25PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product  1' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when name contains non-Latin characters',
    tags: ['@26PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Продукт1' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when name contains a postfix space',
    tags: ['@27PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: ' Product1' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when name contains a prefix space',
    tags: ['@28PPU-API', TAGS.REGRESSION],
    data: generateProductData({ name: 'Product1 ' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price is below the minimum',
    tags: ['@29PPU-API', TAGS.REGRESSION],
    data: generateProductData({ price: 0 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price is above the maximum',
    tags: ['@30PPU-API', TAGS.REGRESSION],
    data: generateProductData({ price: 100000 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price is negative',
    tags: ['@31PPU-API', TAGS.REGRESSION],
    data: generateProductData({ price: -10 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price is non-integer (decimal)',
    tags: ['@32PPU-API', TAGS.REGRESSION],
    data: generateProductData({ price: 99.99 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price is non-numeric',
    tags: ['@33PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: 'invalidPrice' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price contains leading zeros',
    tags: ['@34PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '01234' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when price contains a six-digit number with leading zeros',
    tags: ['@35PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '012345' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price contains spaces',
    tags: ['@36PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '1 1' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when price contains special characters',
    tags: ['@37PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '111!' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when price field is empty',
    tags: ['@38PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), price: '' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount is above the maximum',
    tags: ['@39PPU-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 1000 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount is negative',
    tags: ['@40PPU-API', TAGS.REGRESSION],
    data: generateProductData({ amount: -10 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount is non-integer',
    tags: ['@41PPU-API', TAGS.REGRESSION],
    data: generateProductData({ amount: 100.5 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount is non-numeric',
    tags: ['@42PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: 'invalidAmount' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount contains leading zeros',
    tags: ['@43PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '012' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount contains spaces',
    tags: ['@44PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '1 1' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should not update product when amount contains special characters',
    tags: ['@45PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '11!' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when amount field is empty',
    tags: ['@46PPU-API', TAGS.REGRESSION],
    data: { ...generateProductData(), amount: '' },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when notes exceed the allowed length',
    tags: ['@47PPU-API', TAGS.REGRESSION],
    data: generateProductData({
      notes:
        'bpuetxdzvrfzvvseuggoaxcmyissokpkvwljwqsbhjbdtalpmqpwfdmoiqmjtjvetvwbgudhnxgvapptqnebrpzfkgmtmlfpkklfrwwleinkdasjjypykzgyzpoysdzgrsdoziivyzldyyvfgntwgzsynlvmwhhtvlyxdlrqijfyclbfcuauoeyyrwamlouayqhlmwawuofonmmdcjrwuslkndxrkgeieirykxwphhrfyvojqhnvhjjgavp'
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should not update product when notes contain "<>" symbols',
    tags: ['@48PPU-API', TAGS.REGRESSION],
    data: generateProductData({ notes: 'Test <>' }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  }
];
