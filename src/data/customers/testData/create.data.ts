import _ from 'lodash';
import { ERRORS } from 'data/errorMesages';
import { STATUS_CODES } from 'data/statusCodes';
import { TAGS } from 'data/tags';
import { generateNewCustomer } from 'data/customers/generateCustomer';

export const createCustomerTestDataPositive = [
  {
    testName: 'Shoud create customer with smoke data',
    tags: ['@1PC-API', TAGS.SMOKE, TAGS.REGRESSION],
    data: generateNewCustomer(),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with valid email',
    tags: ['@2PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `test.mail@ex.com` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with 2 letter in domain part in email',
    tags: ['@3PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `test1@mail.co` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with special symbol in name part in email',
    tags: ['@4PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `simple_email@example.com` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with multiple domain parts in email',
    tags: ['@5PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `user-name@example.co.uk` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName:
      'Shoud create customer with special symbol in domain part in email',
    tags: ['@6PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `customer_email@shopping-site.com` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with valid street',
    tags: ['@7PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `5th Avenue` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with 20 symbols in street',
    tags: ['@8PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `45326 Eleeman Street` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with 40 symbols in street',
    tags: ['@9PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      street: `123 Main Street123 Main Street123 Mainsa`
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with 1 symbols in street',
    tags: ['@10PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `a` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with 2 symbols in street',
    tags: ['@11PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `ab` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with 39 symbols in street',
    tags: ['@12PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      street: `789 Pine Street789 Pine Street789Street`
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with number 1 in flat',
    tags: ['@13PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ flat: 1 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with number 5000 in flat',
    tags: ['@14PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ flat: 5000 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with number 9999 in flat',
    tags: ['@15PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ flat: 9999 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with valid name',
    tags: ['@16PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `David Bowie` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 20 symbols in name',
    tags: ['@17PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `DavidBowieDavidBowie` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 40 symbols in name',
    tags: ['@18PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      name: `DavidBowieDavidBowieDavidBowieDavidBowie`
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 39 symbols in name',
    tags: ['@19PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      name: `DavidBowieDavidBowieDavidBowieDavidBowi`
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create 1 symbols name on customer',
    tags: ['@20PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `D` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 1 symbols in name',
    tags: ['@21PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `DB` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with valid city',
    tags: ['@22PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `New York` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 10 symbols in city',
    tags: ['@23PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `NewYorkNew` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 20 symbols in city',
    tags: ['@24PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `NewYorkNewNewYorkNew` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 19 symbols in city',
    tags: ['@25PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `NewYorkNewNewYorkNe` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with N in city',
    tags: ['@26PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `N` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 1 symbols in city',
    tags: ['@27PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `NY` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with number 1 in house',
    tags: ['@28PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: 1 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with number 500 in house',
    tags: ['@29PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: 500 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with number 999 in house',
    tags: ['@30PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: 999 }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with valid phone number',
    tags: ['@31PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+79900999090` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with min phone number',
    tags: ['@32PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+1234567890` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer with max phone number',
    tags: ['@33PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+12345678901234567890` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 19 digits phone number',
    tags: ['@34PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+1234567890123456789` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },

  {
    testName: 'Shoud create customer without notes',
    tags: ['@35PC-API', TAGS.REGRESSION],
    data: _.omit(generateNewCustomer(), 'notes'),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 1 symbols in notes',
    tags: ['@36PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ notes: `a` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 125 symbols in notes',
    tags: ['@37PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      notes: `one hundred twenty-fivecharactersincommentsonehundredtwenty-fivecharactersincommentsonehundredtwenty-fivecharactersincomments`
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with 250 symbols in notes',
    tags: ['@38PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      notes: `two hundred and fifty characters per line two hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo`
    }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  },
  {
    testName: 'Shoud create customer with special symbols in notes',
    tags: ['@39PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ notes: `( ) [ ] , ; : @ " ' !` }),
    IsSuccess: true,
    ErrorMessage: null,
    status: STATUS_CODES.CREATED
  }
];

export const createCustomerTestDataNegative = [
  {
    testName: 'Shoud NOT create customer with Cyrillic in notes',
    tags: ['@40PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `Необязательное поле` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer without email',
    tags: ['@41PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols in email',
    tags: ['@42PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `te(st),ma"il@ex.com` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with Cyrillic in email',
    tags: ['@43PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `test@цд.com` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should NOT create customer with 1 letter in domain name in email',
    tags: ['@44PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `test1@mail.c` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should NOT create customer with Cyrillic in domain name in email',
    tags: ['@45PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `test@mail.кд` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName:
      'Should NOT create customer with dot at the beginning in name part in email',
    tags: ['@46PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ email: `.test@mail.com` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer witout street',
    tags: ['@47PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: ` ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 41 symbols in street',
    tags: ['@48PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      street: `123MainStreetThis is too longforstreetname`
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with Cyrillic street',
    tags: ['@49PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `Улица Ленина` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 2 space in street',
    tags: ['@50PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `Main  Street` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with postfix space in street',
    tags: ['@51PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `Main Street  ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with prefix space in street',
    tags: ['@52PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: ` Main Street` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols in street',
    tags: ['@53PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ street: `Main Street (123)` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer without number in flat',
    tags: ['@54PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: ` ` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with letters in flat',
    tags: ['@55PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `1aa1` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with number 55555 in flat',
    tags: ['@56PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: 55555 },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with fractional number in flat',
    tags: ['@57PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ flat: 1.5 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with negative number in flat',
    tags: ['@58PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ flat: -1 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with spaces in flat',
    tags: ['@59PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `9 9` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols in flat',
    tags: ['@60PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `999!` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with zero in flat',
    tags: ['@61PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ flat: 0 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with number 0123 in flat',
    tags: ['@62PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `0123` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with number 01234 in flat',
    tags: ['@63PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), flat: `01234` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer witout name',
    tags: ['@64PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: ` ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 41 symbols in name',
    tags: ['@65PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      name: `DavidBowieDavidBowieDavidBowieDavidBowieD`
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with Cyrillic in name',
    tags: ['@66PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `Дэвид Боуи` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 2 space in name',
    tags: ['@67PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `David  Bowie` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with postfix space in name',
    tags: ['@68PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `David Bowie  ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with prefix space in name',
    tags: ['@69PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: ` David Bowie` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols in name',
    tags: ['@70PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ name: `David (Bowie)` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer witout city',
    tags: ['@71PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: ` ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 21 symbols in city',
    tags: ['@72PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `NewYorkNewNewYorkNewY` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with Cyrillic city',
    tags: ['@73PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `Нью Йорк` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 2 space in city',
    tags: ['@74PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `New  York` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with postfix space in city',
    tags: ['@75PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `New York ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with prefix space in city',
    tags: ['@76PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: ` New York` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols in city',
    tags: ['@77PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ city: `New(York)` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer without number in house',
    tags: ['@78PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: undefined }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with letters in house',
    tags: ['@79PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `a1q` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with number 5555 in house',
    tags: ['@80PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: 5555 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with fractional number in house',
    tags: ['@81PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: 1.5 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with negative number in house',
    tags: ['@82PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: -1 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with spaces in house',
    tags: ['@83PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `9 9` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols in house',
    tags: ['@84PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `!99` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with zero in house',
    tags: ['@85PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ house: 0 }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with number 012 in house',
    tags: ['@86PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `012` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with number 0123 in house',
    tags: ['@87PC-API', TAGS.REGRESSION],
    data: { ...generateNewCustomer(), house: `0123` },
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 21 digits phone number',
    tags: ['@88PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+123456789012345678900` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer without phone number',
    tags: ['@89PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: ` ` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 9 digits phone number',
    tags: ['@90PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+123456789` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with letters phone number',
    tags: ['@91PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+123abc4567` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with ++ in phone number',
    tags: ['@92PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `++1234567890` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with special symbols phone number',
    tags: ['@93PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `+(123)4567890` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer without + phone number',
    tags: ['@94PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ phone: `1234567890` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with 251 symbols in notes',
    tags: ['@95PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({
      notes: `two hundred and fifty characters per line two hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwo hundred and fifty characters per linetwoh`
    }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  },
  {
    testName: 'Should NOT create customer with symbols <> in notes',
    tags: ['@96PC-API', TAGS.REGRESSION],
    data: generateNewCustomer({ notes: `<notes>` }),
    IsSuccess: false,
    ErrorMessage: ERRORS.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.INVALID_REQUEST
  }
];
