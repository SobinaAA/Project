export const customersEmptyPageMock = {
  Customers: [],
  IsSuccess: true,
  ErrorMessage: null
};

export const customersMyPageMock = {
  Customers: [
    {
      _id: '67a335f49f31117d8c5137f8',
      email: 'myMockEmail@alena.com',
      name: 'Alena',
      country: 'Russia',
      city: 'Yekaterinburg',
      street: 'Sadovaya',
      house: 12,
      flat: 54,
      phone: '+79030704356',
      createdOn: '2025-02-05T09:57:00.000Z',
      notes: 'Если вы видите этого пользователя, поздравляю!'
    },
    {
      _id: '67a335f49f31117d8c5137f8',
      email: 'myMockEmail@aria.com',
      name: 'Aria',
      country: 'Russia',
      city: 'Yekaterinburg',
      street: 'Sadovaya',
      house: 12,
      flat: 54,
      phone: '+79030704357',
      createdOn: '2025-02-05T09:58:00.000Z',
      notes: 'Если вы видите этого пользователя, поздравляю вдвойне!'
    }
  ],
  sorting: {
    sortField: 'createdOn',
    sortOrder: 'desc'
  },
  IsSuccess: true,
  ErrorMessage: null
};

export const oneCustomerMock = {
  Customer: {
    _id: '67a335f49f31117d8c5137f8',
    email: 'myMockEmail@alena.com',
    name: 'Alena',
    country: 'Russia',
    city: 'Yekaterinburg',
    street: 'Sadovaya',
    house: 12,
    flat: 54,
    phone: '+79030704356',
    createdOn: '2025-02-05T09:57:00.000Z',
    notes: 'Если вы видите этого пользователя, поздравляю!'
  },
  IsSuccess: true,
  ErrorMessage: null
};
