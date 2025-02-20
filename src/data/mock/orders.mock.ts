export const emptyListOfOrders = {
  Orders: [],
  IsSuccess: true,
  ErrorMessage: null
};

export const oneOrderMock = {
  Order: {
    _id: '67b46e479f31117d8c584035',
    status: 'Draft',
    customer: {
      _id: '67b241899f31117d8c57642d',
      email: 'AlenaNe@myilo.com',
      name: 'Alenushka',
      country: 'USA',
      city: 'Yekat',
      street: 'Aplle street',
      house: 12,
      flat: 221,
      phone: '+79090067893',
      createdOn: '2025-02-16T19:50:00.000Z',
      notes: 'Congratulations!'
    },
    products: [
      {
        _id: '67a8dca79f31117d8c541312',
        name: 'Product',
        amount: 122,
        price: 122,
        manufacturer: 'Xiaomi',
        notes: 'Cogratulations!',
        received: false
      }
    ],
    delivery: {
      address: {
        country: 'USA',
        city: 'Yekat',
        street: 'Aplle street',
        house: 12,
        flat: 221
      },
      finalDate: '2025-02-28T00:00:00.000Z',
      condition: 'Delivery'
    },
    total_price: 14884,
    createdOn: '2025-02-18T11:25:00.000Z',
    comments: [],
    history: [
      {
        status: 'Draft',
        customer: '67b241899f31117d8c57642d',
        products: [
          {
            _id: '67a8dca79f31117d8c541312',
            name: 'Bacon14175',
            amount: 28,
            price: 95785,
            manufacturer: 'Xiaomi',
            notes:
              'rTPjE5DRp3GzppftRHYLFRizSbiFTSW6K1omRkphYOW7HVFxRm5caYOWZ7apzHwF6Gy8HdhWmwyQztVxBcefBtj4DwDOeDeCpL14c5FHSZ6tghQfaZfEQr4GSRNhJ8yO4tPCJfFzE1RpJVFEJN0VspoRV0rVTbhsA5N7z8qk12s2AsFxxCErfBsEgtn4YYVn74wEIjyshgYYmCnyGwAQguvOPSDv00TLcgGFDMT3TLFC6sXV5hmMamUMId',
            received: false
          }
        ],
        total_price: 95785,
        delivery: {
          address: {
            country: 'USA',
            city: 'City jfniXVmVtSjmlCT',
            street: 'Street 5Hp1YMFWE5xsuf9lO7wSzMEVC22v1JSPg',
            house: 766,
            flat: 6486
          },
          finalDate: '2025-02-28T00:00:00.000Z',
          condition: 'Delivery'
        },
        changedOn: '2025-02-18T11:45:00.000Z',
        action: 'Delivery Scheduled'
      },
      {
        status: 'Draft',
        customer: '67b241899f31117d8c57642d',
        products: [
          {
            _id: '67a8dca79f31117d8c541312',
            name: 'Bacon14175',
            amount: 28,
            price: 95785,
            manufacturer: 'Xiaomi',
            notes:
              'rTPjE5DRp3GzppftRHYLFRizSbiFTSW6K1omRkphYOW7HVFxRm5caYOWZ7apzHwF6Gy8HdhWmwyQztVxBcefBtj4DwDOeDeCpL14c5FHSZ6tghQfaZfEQr4GSRNhJ8yO4tPCJfFzE1RpJVFEJN0VspoRV0rVTbhsA5N7z8qk12s2AsFxxCErfBsEgtn4YYVn74wEIjyshgYYmCnyGwAQguvOPSDv00TLcgGFDMT3TLFC6sXV5hmMamUMId',
            received: false
          }
        ],
        total_price: 95785,
        delivery: null,
        changedOn: '2025-02-18T11:25:00.000Z',
        action: 'Order created'
      }
    ]
  },
  IsSuccess: true,
  ErrorMessage: null
};
