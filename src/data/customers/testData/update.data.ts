import _ from 'lodash';
import { ERRORS } from '../../errorMesages';
import { STATUS_CODES } from '../../statusCodes';
import { TAGS } from '../../tags';
import { generateNewCustomer } from '../generateCustomer';

export const updateCustomerTestDataPositive = [
  {
    testName: 'Shoud update customer with smoke data',
    tags: ['@1PTC-API', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateNewCustomer(),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with valid email',
    tags: ['@2PTC-API', TAGS.REGRESSION],
    data: { email: `test.mail@ex.com` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 2 letter in domain part in email',
    tags: ['@3PTC-API', TAGS.REGRESSION],
    data: { email: `test1@mail.co` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with special symbol in name part in email',
    tags: ['@4PTC-API', TAGS.REGRESSION],
    data: { email: `simple_email@example.com` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with multiple domain parts in email',
    tags: ['@5PTC-API', TAGS.REGRESSION],
    data: { email: `user-name@example.co.uk` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName:
      'Shoud update customer with special symbol in domain part in email',
    tags: ['@6PTC-API', TAGS.REGRESSION],
    data: { email: `customer_email@shopping-site.com` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with valid street',
    tags: ['@7PTC-API', TAGS.REGRESSION],
    data: { street: `5th Avenue` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with 20 symbols in street',
    tags: ['@8PTC-API', TAGS.REGRESSION],
    data: { street: `45326 Eleeman Street` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with 40 symbols in street',
    tags: ['@9PTC-API', TAGS.REGRESSION],
    data: {
      street: `123 Main Street123 Main Street123 Mainsa`
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with 1 symbols in street',
    tags: ['@10PTC-API', TAGS.REGRESSION],
    data: { street: `a` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with 2 symbols in street',
    tags: ['@11PTC-API', TAGS.REGRESSION],
    data: { street: `ab` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with 39 symbols in street',
    tags: ['@12PTC-API', TAGS.REGRESSION],
    data: {
      street: `789 Pine Street789 Pine Street789Street`
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with number 1 in flat',
    tags: ['@13PTC-API', TAGS.REGRESSION],
    data: { flat: 1 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with number 5000 in flat',
    tags: ['@14PTC-API', TAGS.REGRESSION],
    data: { flat: 5000 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with number 9999 in flat',
    tags: ['@15PTC-API', TAGS.REGRESSION],
    data: { flat: 9999 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with valid name',
    tags: ['@16PTC-API', TAGS.REGRESSION],
    data: { name: `David Bowie` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 20 symbols in name',
    tags: ['@17PTC-API', TAGS.REGRESSION],
    data: { name: `DavidBowieDavidBowie` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 40 symbols in name',
    tags: ['@18PTC-API', TAGS.REGRESSION],
    data: {
      name: `DavidBowieDavidBowieDavidBowieDavidBowie`
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 39 symbols in name',
    tags: ['@19PTC-API', TAGS.REGRESSION],
    data: {
      name: `DavidBowieDavidBowieDavidBowieDavidBowi`
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update 1 symbols name on customer',
    tags: ['@20PTC-API', TAGS.REGRESSION],
    data: { name: `D` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 1 symbols in name',
    tags: ['@21PTC-API', TAGS.REGRESSION],
    data: { name: `DB` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with valid city',
    tags: ['@22PTC-API', TAGS.REGRESSION],
    data: { city: `New York` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 10 symbols in city',
    tags: ['@23PTC-API', TAGS.REGRESSION],
    data: { city: `NewYorkNew` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 20 symbols in city',
    tags: ['@24PTC-API', TAGS.REGRESSION],
    data: { city: `NewYorkNewNewYorkNew` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 19 symbols in city',
    tags: ['@25PTC-API', TAGS.REGRESSION],
    data: { city: `NewYorkNewNewYorkNe` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with N in city',
    tags: ['@26PTC-API', TAGS.REGRESSION],
    data: { city: `N` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 1 symbols in city',
    tags: ['@27PTC-API', TAGS.REGRESSION],
    data: { city: `NY` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with number 1 in house',
    tags: ['@28PTC-API', TAGS.REGRESSION],
    data: { house: 1 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with number 500 in house',
    tags: ['@29PTC-API', TAGS.REGRESSION],
    data: { house: 500 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with number 999 in house',
    tags: ['@30PTC-API', TAGS.REGRESSION],
    data: { house: 999 },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with valid phone number',
    tags: ['@31PTC-API', TAGS.REGRESSION],
    data: { phone: `+79900999090` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with min phone number',
    tags: ['@32PTC-API', TAGS.REGRESSION],
    data: { phone: `+1234567890` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer with max phone number',
    tags: ['@33PTC-API', TAGS.REGRESSION],
    data: { phone: `+12345678901234567890` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 19 digits phone number',
    tags: ['@34PTC-API', TAGS.REGRESSION],
    data: { phone: `+1234567890123456789` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },

  {
    testName: 'Shoud update customer without notes',
    tags: ['@35PTC-API', TAGS.REGRESSION],
    data: _.omit(generateNewCustomer(), 'notes'),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 1 symbols in notes',
    tags: ['@36PTC-API', TAGS.REGRESSION],
    data: { notes: `a` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 125 symbols in notes',
    tags: ['@37PTC-API', TAGS.REGRESSION],
    data: {
      notes: `one hundred twenty-fivecharactersincommentsonehundredtwenty-fivecharactersincommentsonehundredtwenty-fivecharactersincomments`
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with 250 symbols in notes',
    tags: ['@38PTC-API', TAGS.REGRESSION],
    data: {
      notes: `two hundred and fifty characters per line two hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo`
    },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  },
  {
    testName: 'Shoud update customer with special symbols in notes',
    tags: ['@39PTC-API', TAGS.REGRESSION],
    data: { notes: `( ) [ ] , ; : @ " ' !` },
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.OK
  }
];

export const updateCustomerTestDataNegative = [
  {
    testName: 'Shoud NOT update customer with Cyrillic in notes',
    tags: ['@40PTC-API', TAGS.REGRESSION],
    data: { street: `Необязательное поле` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer without email',
    tags: ['@41PTC-API', TAGS.REGRESSION],
    data: { email: `` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols in email',
    tags: ['@42PTC-API', TAGS.REGRESSION],
    data: { email: `test,ma"il@ex.com` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with Cyrillic in email',
    tags: ['@43PTC-API', TAGS.REGRESSION],
    data: { email: `test@цд.com` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should NOT update customer with 1 letter in domain name in email',
    tags: ['@44PTC-API', TAGS.REGRESSION],
    data: { email: `test1@mail.c` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should NOT update customer with Cyrillic in domain name in email',
    tags: ['@45PTC-API', TAGS.REGRESSION],
    data: { email: `test@mail.кд` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should NOT update customer with dot at the beginning in name part in email',
    tags: ['@46PTC-API', TAGS.REGRESSION],
    data: { email: `.test@mail.com` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer witout street',
    tags: ['@47PTC-API', TAGS.REGRESSION],
    data: { street: ` ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 41 symbols in street',
    tags: ['@48PTC-API', TAGS.REGRESSION],
    data: {
      street: `123MainStreetThis is too longforstreetname`
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with Cyrillic street',
    tags: ['@49PTC-API', TAGS.REGRESSION],
    data: { street: `Улица Ленина` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 2 space in street',
    tags: ['@50PTC-API', TAGS.REGRESSION],
    data: { street: `Main  Street` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with postfix space in street',
    tags: ['@51PTC-API', TAGS.REGRESSION],
    data: { street: `Main Street  ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with prefix space in street',
    tags: ['@52PTC-API', TAGS.REGRESSION],
    data: { street: ` Main Street` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols in street',
    tags: ['@53PTC-API', TAGS.REGRESSION],
    data: { street: `<Main Street 123>` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer without number in flat',
    tags: ['@54PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: ` ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with letters in flat',
    tags: ['@55PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `1aa1` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with number 55555 in flat',
    tags: ['@56PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: 55555 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with fractional number in flat',
    tags: ['@57PTC-API', TAGS.REGRESSION],
    data: { flat: 1.5 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with negative number in flat',
    tags: ['@58PTC-API', TAGS.REGRESSION],
    data: { flat: -1 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with spaces in flat',
    tags: ['@59PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `9 9` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols in flat',
    tags: ['@60PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `999!` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with zero in flat',
    tags: ['@61PTC-API', TAGS.REGRESSION],
    data: { flat: 0 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with number 0123 in flat',
    tags: ['@62PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `0123` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with number 01234 in flat',
    tags: ['@63PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `01234` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer witout name',
    tags: ['@64PTC-API', TAGS.REGRESSION],
    data: { name: ` ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 41 symbols in name',
    tags: ['@65PTC-API', TAGS.REGRESSION],
    data: {
      name: `DavidBowieDavidBowieDavidBowieDavidBowieD`
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with Cyrillic in name',
    tags: ['@66PTC-API', TAGS.REGRESSION],
    data: { name: `Дэвид Боуи` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 2 space in name',
    tags: ['@67PTC-API', TAGS.REGRESSION],
    data: { name: `David  Bowie` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with postfix space in name',
    tags: ['@68PTC-API', TAGS.REGRESSION],
    data: { name: `David Bowie  ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with prefix space in name',
    tags: ['@69PTC-API', TAGS.REGRESSION],
    data: { name: ` David Bowie` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols in name',
    tags: ['@70PTC-API', TAGS.REGRESSION],
    data: { name: `<David Bowie>` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer witout city',
    tags: ['@71PTC-API', TAGS.REGRESSION],
    data: { city: ` ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 21 symbols in city',
    tags: ['@72PTC-API', TAGS.REGRESSION],
    data: { city: `NewYorkNewNewYorkNewY` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with Cyrillic city',
    tags: ['@73PTC-API', TAGS.REGRESSION],
    data: { city: `Нью Йорк` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 2 space in city',
    tags: ['@74PTC-API', TAGS.REGRESSION],
    data: { city: `New  York` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with postfix space in city',
    tags: ['@75PTC-API', TAGS.REGRESSION],
    data: { city: `New York ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with prefix space in city',
    tags: ['@76PTC-API', TAGS.REGRESSION],
    data: { city: ` New York` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols in city',
    tags: ['@77PTC-API', TAGS.REGRESSION],
    data: { city: `<NewYork>` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer without number in house',
    tags: ['@78PTC-API', TAGS.REGRESSION],
    data: { house: undefined },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with letters in house',
    tags: ['@79PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `a1q` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with number 5555 in house',
    tags: ['@80PTC-API', TAGS.REGRESSION],
    data: { house: 5555 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with fractional number in house',
    tags: ['@81PTC-API', TAGS.REGRESSION],
    data: { house: 1.5 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with negative number in house',
    tags: ['@82PTC-API', TAGS.REGRESSION],
    data: { house: -1 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with spaces in house',
    tags: ['@83PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `9 9` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols in house',
    tags: ['@84PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `!99` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with zero in house',
    tags: ['@85PTC-API', TAGS.REGRESSION],
    data: { house: 0 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with number 012 in house',
    tags: ['@86PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `012` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with number 0123 in house',
    tags: ['@87PTC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `0123` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 21 digits phone number',
    tags: ['@88PTC-API', TAGS.REGRESSION],
    data: { phone: `+123456789012345678900` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer without phone number',
    tags: ['@89PTC-API', TAGS.REGRESSION],
    data: { phone: ` ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 9 digits phone number',
    tags: ['@90PTC-API', TAGS.REGRESSION],
    data: { phone: `+123456789` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with letters phone number',
    tags: ['@91PTC-API', TAGS.REGRESSION],
    data: { phone: `+123abc4567` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with ++ in phone number',
    tags: ['@92PTC-API', TAGS.REGRESSION],
    data: { phone: `++1234567890` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with special symbols phone number',
    tags: ['@93PTC-API', TAGS.REGRESSION],
    data: { phone: `+123{4}567890` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer without + phone number',
    tags: ['@94PTC-API', TAGS.REGRESSION],
    data: { phone: `1234567890` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with 251 symbols in notes',
    tags: ['@95PTC-API', TAGS.REGRESSION],
    data: {
      notes: `two hundred and fifty characters per line two hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwoh`
    },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT update customer with symbols <> in notes',
    tags: ['@96PTC-API', TAGS.REGRESSION],
    data: { notes: `<notes>` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  }
];
