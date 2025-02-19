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

export const ordersListMock = {
  Orders: [
    {
      _id: '67b4e3759f31117d8c5862a2',
      status: 'Draft',
      customer: {
        _id: '67b4e3749f31117d8c586293',
        email: '1739907955801Lowell_Schoen@yahoo.com',
        name: 'Name QajXsipnrMbqNHnmHSaUAyKdbxKhYywcFku',
        country: 'Russia',
        city: 'City UmDmGLqqVAHjQID',
        street: 'Street WDqbEVYTlJm49Rw8OcNJHePwoyTj48mMA',
        house: 499,
        flat: 6710,
        phone: '+566139382122',
        createdOn: '2025-02-18T19:45:00.000Z',
        notes:
          'Notes UpwriFOKGUgbfiDjfxMCQspbATlEhRxznqvvIfQhOqPDblgRurAzeDFfVeVHAWfrZQIecNKSYDhqQWXxiyYqMQHbEWwRNVAIcgscrMjXQtRBtFVmmfhDrLXimWaWoIlbFIBgcWAaPfqNQJPpTPybwqQoNGHtqfgTDpSRvMUStpayvIVjvqOWzcZSDrxZPoTdAfwvRyuEgZbnSsBuYOMJliVTUGfjLpcAasqbxtzThpUQutaprhHV'
      },
      products: [
        {
          _id: '67b4e3749f31117d8c586297',
          name: 'Hat1489',
          amount: 353,
          price: 19656,
          manufacturer: 'Xiaomi',
          notes:
            'IfxuNT8FTtjCgBTYcAWCweQCuck6UyRJ3FDQQWNjgzYOe9EXtxFJ0N7FM1ska8TaBlc50Zueem4khbo5SJM7r2YD6GN0Ctblp60R8v6rp2Gq0wRwAeLa1SBEoOPBL46Ku9pn7SGGBQpeSuXpaPNHa3Bj7s006P6G4kaT7AQmnPCgSmNhafWv2W8qxN8s1bSS2CJdsAYDFEnZb5xPgv19cgdR3QFTlDk2njHKmEkwPgnD5XBvaS9CL5Ypaq',
          received: false
        },
        {
          _id: '67b4e3759f31117d8c58629a',
          name: 'Bike94149',
          amount: 155,
          price: 12265,
          manufacturer: 'Amazon',
          notes:
            '4FadhDrocnID9WC27HCFoBJxmy2ZJb4K6DFGbjVcH8szYyPTloHTmXi8dPtz5qrCbkq1Gb0MhNJPxqcWfLO1xGSVh35eaYf3LiDX7XW0RG8KNuv6VXxTzD6YWogdi7LHaxGiFV5gPKVveHZbcTj5JJaB8YBucDKSmKW3gQfYzKtvhRVz0dqGeOngLc8lamksGnWyS0gcSuIyk44tH2elwK6yJWsawuE8hYXZN02gwbiAXjufVcTcjQV1XV',
          received: false
        }
      ],
      delivery: null,
      total_price: 31921,
      createdOn: '2025-02-18T19:45:00.000Z',
      comments: [],
      history: [
        {
          status: 'Draft',
          customer: '67b4e3749f31117d8c586293',
          products: [
            {
              _id: '67b4e3749f31117d8c586297',
              name: 'Hat1489',
              amount: 353,
              price: 19656,
              manufacturer: 'Xiaomi',
              notes:
                'IfxuNT8FTtjCgBTYcAWCweQCuck6UyRJ3FDQQWNjgzYOe9EXtxFJ0N7FM1ska8TaBlc50Zueem4khbo5SJM7r2YD6GN0Ctblp60R8v6rp2Gq0wRwAeLa1SBEoOPBL46Ku9pn7SGGBQpeSuXpaPNHa3Bj7s006P6G4kaT7AQmnPCgSmNhafWv2W8qxN8s1bSS2CJdsAYDFEnZb5xPgv19cgdR3QFTlDk2njHKmEkwPgnD5XBvaS9CL5Ypaq',
              received: false
            },
            {
              _id: '67b4e3759f31117d8c58629a',
              name: 'Bike94149',
              amount: 155,
              price: 12265,
              manufacturer: 'Amazon',
              notes:
                '4FadhDrocnID9WC27HCFoBJxmy2ZJb4K6DFGbjVcH8szYyPTloHTmXi8dPtz5qrCbkq1Gb0MhNJPxqcWfLO1xGSVh35eaYf3LiDX7XW0RG8KNuv6VXxTzD6YWogdi7LHaxGiFV5gPKVveHZbcTj5JJaB8YBucDKSmKW3gQfYzKtvhRVz0dqGeOngLc8lamksGnWyS0gcSuIyk44tH2elwK6yJWsawuE8hYXZN02gwbiAXjufVcTcjQV1XV',
              received: false
            }
          ],
          total_price: 31921,
          delivery: null,
          changedOn: '2025-02-18T19:45:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b486249f31117d8c58496e',
      status: 'Canceled',
      customer: {
        _id: '67b4861f9f31117d8c584943',
        email: '1739884062381Noelia.McDermott12@gmail.com',
        name: 'Name mfnzlqdcPfKnOxRubZjynPkDtbyjNekONey',
        country: 'Belarus',
        city: 'City WIYyxXdcBZrwmNq',
        street: 'Street VEsUAs5qNNImxMZiIvBSmw7Pd8NZ7s5dR',
        house: 620,
        flat: 8577,
        phone: '+700715114236',
        createdOn: '2025-02-18T13:07:00.000Z',
        notes:
          'Notes KBOnqFLuQYiJHHfxFhZcPdrSNkYSxSlyCgpAWtCncPoKQyROBBweLsnvBbmkqyUQQTuSExfbYCsKuCIupfMZgewfPyRaxXtgkzjqGNKmpSDaECzfoLZzsJHimVOvuJODXhuPmRatCaXFTfBlxaLGEZCKaEjbVROzrXytJiOpUBNpldKMksELbvznEUiLfWSxnGctOOmqQnBXMJAOpzWGFJWywKjHPeBQWhFwjbllMdTzZWjAMgLI'
      },
      products: [
        {
          _id: '67b4861f9f31117d8c584946',
          name: 'Salad83333',
          amount: 608,
          price: 22996,
          manufacturer: 'Microsoft',
          notes:
            '9tfu6IcA7eLmuQeoShMjkPoVbAsXiA6jHeVc2Z8wTE5o9Y2V4C9Sk6fn0mdLnVghSb0FwdHXtN4VhzDHTaTvyDmlKkX53FIuwyOlSLECFGapJPKEHlSL4cGKeWAAaeoKLSojiaIehr0XTV3hb7iOvfgx2oscp1QOA5aIMxKIxlNjNUsvVlNGGQY4m8O9oJFUHXRfgxarBXgqjEbxUQMi63QZeFTFX1PEOzT7lB9B92bQUVuMAyQ94yGPRY',
          received: false
        },
        {
          _id: '67b4861f9f31117d8c584949',
          name: 'Chicken71610',
          amount: 227,
          price: 50541,
          manufacturer: 'Microsoft',
          notes:
            'z6YhI071uiEFhY2Zmlc6xG47cSpkt9DzF99cW2u3NPInr13lFDL7IlTw0JbZQpdAwJWaZlTe238E6EYiyqkUWWvPMt28F7p5pXSCPTuJQI7uPs248ZaiuicoOdV004rmZ6ZT591Qmm7kQT1nq4o5vYi3GBujnmccGAhIc8yFog00Qd8FmV3YHmcMWRwCn4M6RYfpLNWu3xT4rzpXQN870cmciNyP7sdhL0Uazc1Y1hkyDVMhL2q02CInnm',
          received: false
        }
      ],
      delivery: null,
      total_price: 73537,
      createdOn: '2025-02-18T13:07:00.000Z',
      comments: [],
      history: [
        {
          status: 'Canceled',
          customer: '67b4861f9f31117d8c584943',
          products: [
            {
              _id: '67b4861f9f31117d8c584946',
              name: 'Salad83333',
              amount: 608,
              price: 22996,
              manufacturer: 'Microsoft',
              notes:
                '9tfu6IcA7eLmuQeoShMjkPoVbAsXiA6jHeVc2Z8wTE5o9Y2V4C9Sk6fn0mdLnVghSb0FwdHXtN4VhzDHTaTvyDmlKkX53FIuwyOlSLECFGapJPKEHlSL4cGKeWAAaeoKLSojiaIehr0XTV3hb7iOvfgx2oscp1QOA5aIMxKIxlNjNUsvVlNGGQY4m8O9oJFUHXRfgxarBXgqjEbxUQMi63QZeFTFX1PEOzT7lB9B92bQUVuMAyQ94yGPRY',
              received: false
            },
            {
              _id: '67b4861f9f31117d8c584949',
              name: 'Chicken71610',
              amount: 227,
              price: 50541,
              manufacturer: 'Microsoft',
              notes:
                'z6YhI071uiEFhY2Zmlc6xG47cSpkt9DzF99cW2u3NPInr13lFDL7IlTw0JbZQpdAwJWaZlTe238E6EYiyqkUWWvPMt28F7p5pXSCPTuJQI7uPs248ZaiuicoOdV004rmZ6ZT591Qmm7kQT1nq4o5vYi3GBujnmccGAhIc8yFog00Qd8FmV3YHmcMWRwCn4M6RYfpLNWu3xT4rzpXQN870cmciNyP7sdhL0Uazc1Y1hkyDVMhL2q02CInnm',
              received: false
            }
          ],
          total_price: 73537,
          delivery: null,
          changedOn: '2025-02-18T13:08:00.000Z',
          action: 'Order canceled'
        },
        {
          status: 'Draft',
          customer: '67b4861f9f31117d8c584943',
          products: [
            {
              _id: '67b4861f9f31117d8c584946',
              name: 'Salad83333',
              amount: 608,
              price: 22996,
              manufacturer: 'Microsoft',
              notes:
                '9tfu6IcA7eLmuQeoShMjkPoVbAsXiA6jHeVc2Z8wTE5o9Y2V4C9Sk6fn0mdLnVghSb0FwdHXtN4VhzDHTaTvyDmlKkX53FIuwyOlSLECFGapJPKEHlSL4cGKeWAAaeoKLSojiaIehr0XTV3hb7iOvfgx2oscp1QOA5aIMxKIxlNjNUsvVlNGGQY4m8O9oJFUHXRfgxarBXgqjEbxUQMi63QZeFTFX1PEOzT7lB9B92bQUVuMAyQ94yGPRY',
              received: false
            },
            {
              _id: '67b4861f9f31117d8c584949',
              name: 'Chicken71610',
              amount: 227,
              price: 50541,
              manufacturer: 'Microsoft',
              notes:
                'z6YhI071uiEFhY2Zmlc6xG47cSpkt9DzF99cW2u3NPInr13lFDL7IlTw0JbZQpdAwJWaZlTe238E6EYiyqkUWWvPMt28F7p5pXSCPTuJQI7uPs248ZaiuicoOdV004rmZ6ZT591Qmm7kQT1nq4o5vYi3GBujnmccGAhIc8yFog00Qd8FmV3YHmcMWRwCn4M6RYfpLNWu3xT4rzpXQN870cmciNyP7sdhL0Uazc1Y1hkyDVMhL2q02CInnm',
              received: false
            }
          ],
          total_price: 73537,
          delivery: null,
          changedOn: '2025-02-18T13:07:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b481219f31117d8c5842bd',
      status: 'Received',
      customer: {
        _id: '67b481209f31117d8c5842ad',
        email: '1739882783218Moses_Stehr79@gmail.com',
        name: 'GkWfTzwYJRfNmjqQpWyAIfElREHRiOBBnto',
        country: 'Canada',
        city: 'City sPTVbRHHQBFqfVQ',
        street: 'Street pgNG1qfKXaWWRjuyME0RMyIgeTdZuDIWU',
        house: 940,
        flat: 8187,
        phone: '+623254008189',
        createdOn: '2025-02-18T12:46:00.000Z',
        notes:
          'Notes fyYTUYhvnnRrbyYgXLEujcwOBEuwKRAryBHdfXlaWAstOwsQhODNINobYObOxvfGnqnmhtHWEOFmnNhApicWdSgFfindpEExKRFGycZuEUGsfMmoYnIeqdWnyQgKyAvIGyGOXGnDmSPSIgsJnsWrujvxwkwBqZeSyTzuMKUjPlXTOdByANckPjufaEijABVLumaHYJSpZzCoQfFZmKTlvaTwwszvmCtFVmyDKFpVzJrijpCwKQPy'
      },
      products: [
        {
          _id: '67b481209f31117d8c5842b5',
          name: 'Shoes3099',
          amount: 363,
          price: 61937,
          manufacturer: 'Tesla',
          notes:
            'aGkvCDqABVsIjAGxOUgtyHYs2AxdESZfej6ur4GnJvJzHY2obpMhyqVISRfP2WUqHfM3ozvfdxZwXukfP7YFFed346zwmjn9RXbcdjAd0GsLbXW6OBetBH84ob1sdO5tYbzkZUPDEqqepMQhAaMa8Ndhf5K8UN2Bwil3lhWmYUbGLetTNErsi7y4wHcoPLsbB89dFBM4nLHdJyUE66aWptyauIlUg2M6smjax3Cd1dC8OLL7sDOoiCfSx9',
          received: true
        }
      ],
      delivery: {
        address: {
          country: 'France',
          city: 'atxbyjj',
          street: 'TVzDBnk',
          house: 60,
          flat: 1
        },
        finalDate: '2025-02-23T00:00:00.000Z',
        condition: 'Pickup'
      },
      total_price: 61937,
      createdOn: '2025-02-18T12:46:00.000Z',
      comments: [],
      history: [
        {
          status: 'Received',
          customer: '67b481209f31117d8c5842ad',
          products: [
            {
              _id: '67b481209f31117d8c5842b5',
              name: 'Shoes3099',
              amount: 363,
              price: 61937,
              manufacturer: 'Tesla',
              notes:
                'aGkvCDqABVsIjAGxOUgtyHYs2AxdESZfej6ur4GnJvJzHY2obpMhyqVISRfP2WUqHfM3ozvfdxZwXukfP7YFFed346zwmjn9RXbcdjAd0GsLbXW6OBetBH84ob1sdO5tYbzkZUPDEqqepMQhAaMa8Ndhf5K8UN2Bwil3lhWmYUbGLetTNErsi7y4wHcoPLsbB89dFBM4nLHdJyUE66aWptyauIlUg2M6smjax3Cd1dC8OLL7sDOoiCfSx9',
              received: true
            }
          ],
          total_price: 61937,
          delivery: {
            address: {
              country: 'France',
              city: 'atxbyjj',
              street: 'TVzDBnk',
              house: 60,
              flat: 1
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'All products received'
        },
        {
          status: 'In Process',
          customer: '67b481209f31117d8c5842ad',
          products: [
            {
              _id: '67b481209f31117d8c5842b5',
              name: 'Shoes3099',
              amount: 363,
              price: 61937,
              manufacturer: 'Tesla',
              notes:
                'aGkvCDqABVsIjAGxOUgtyHYs2AxdESZfej6ur4GnJvJzHY2obpMhyqVISRfP2WUqHfM3ozvfdxZwXukfP7YFFed346zwmjn9RXbcdjAd0GsLbXW6OBetBH84ob1sdO5tYbzkZUPDEqqepMQhAaMa8Ndhf5K8UN2Bwil3lhWmYUbGLetTNErsi7y4wHcoPLsbB89dFBM4nLHdJyUE66aWptyauIlUg2M6smjax3Cd1dC8OLL7sDOoiCfSx9',
              received: false
            }
          ],
          total_price: 61937,
          delivery: {
            address: {
              country: 'France',
              city: 'atxbyjj',
              street: 'TVzDBnk',
              house: 60,
              flat: 1
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Order processing started'
        },
        {
          status: 'Draft',
          customer: '67b481209f31117d8c5842ad',
          products: [
            {
              _id: '67b481209f31117d8c5842b5',
              name: 'Shoes3099',
              amount: 363,
              price: 61937,
              manufacturer: 'Tesla',
              notes:
                'aGkvCDqABVsIjAGxOUgtyHYs2AxdESZfej6ur4GnJvJzHY2obpMhyqVISRfP2WUqHfM3ozvfdxZwXukfP7YFFed346zwmjn9RXbcdjAd0GsLbXW6OBetBH84ob1sdO5tYbzkZUPDEqqepMQhAaMa8Ndhf5K8UN2Bwil3lhWmYUbGLetTNErsi7y4wHcoPLsbB89dFBM4nLHdJyUE66aWptyauIlUg2M6smjax3Cd1dC8OLL7sDOoiCfSx9',
              received: false
            }
          ],
          total_price: 61937,
          delivery: {
            address: {
              country: 'France',
              city: 'atxbyjj',
              street: 'TVzDBnk',
              house: 60,
              flat: 1
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Delivery Scheduled'
        },
        {
          status: 'Draft',
          customer: '67b481209f31117d8c5842ad',
          products: [
            {
              _id: '67b481209f31117d8c5842b5',
              name: 'Shoes3099',
              amount: 363,
              price: 61937,
              manufacturer: 'Tesla',
              notes:
                'aGkvCDqABVsIjAGxOUgtyHYs2AxdESZfej6ur4GnJvJzHY2obpMhyqVISRfP2WUqHfM3ozvfdxZwXukfP7YFFed346zwmjn9RXbcdjAd0GsLbXW6OBetBH84ob1sdO5tYbzkZUPDEqqepMQhAaMa8Ndhf5K8UN2Bwil3lhWmYUbGLetTNErsi7y4wHcoPLsbB89dFBM4nLHdJyUE66aWptyauIlUg2M6smjax3Cd1dC8OLL7sDOoiCfSx9',
              received: false
            }
          ],
          total_price: 61937,
          delivery: null,
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b481219f31117d8c5842c5',
      status: 'Received',
      customer: {
        _id: '67b481209f31117d8c5842b0',
        email: '1739882783596Uriah80@hotmail.com',
        name: 'ljFwIwFijIJKyqTEdFQJTFGjdbxScvenlOR',
        country: 'Ukraine',
        city: 'City JnaHSLkVHtJKAkH',
        street: 'Street b7bvM8nv8b6dlz0OfGs3cfU6803Fgr8jK',
        house: 702,
        flat: 533,
        phone: '+534619972978',
        createdOn: '2025-02-18T12:46:00.000Z',
        notes:
          'Notes aqqeYltaYFNxWyTSfTXXRPQCrZzwqdcziDZqDOFCMMzVLQfmrVcgCdDNdnymHJFvDHCjotXaiPhzACPjlMyqodqJLtFuCkoKaXsPNtlLkigkqQVivjuXtiXFAaLntvRqzkKpLhTDIanAhAQhkzSvqjiifRILZqqBMYOBubrIwCpRFQbEKDtgKNFlmyPJJEtwYmgemOvrzTZVOgHaKbXvKsGshyrDsGuSSPNXuJYfNuBPyxqnmZnP'
      },
      products: [
        {
          _id: '67b481219f31117d8c5842b9',
          name: 'Chicken27009',
          amount: 557,
          price: 65370,
          manufacturer: 'Tesla',
          notes:
            'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
          received: true
        },
        {
          _id: '67b481219f31117d8c5842b9',
          name: 'Chicken27009',
          amount: 557,
          price: 65370,
          manufacturer: 'Tesla',
          notes:
            'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
          received: true
        }
      ],
      delivery: {
        address: {
          country: 'Canada',
          city: 'kwrzSOf',
          street: 'AOGyUkg',
          house: 65,
          flat: 92
        },
        finalDate: '2025-02-23T00:00:00.000Z',
        condition: 'Pickup'
      },
      total_price: 130740,
      createdOn: '2025-02-18T12:46:00.000Z',
      comments: [],
      history: [
        {
          status: 'Received',
          customer: '67b481209f31117d8c5842b0',
          products: [
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: true
            },
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: true
            }
          ],
          total_price: 130740,
          delivery: {
            address: {
              country: 'Canada',
              city: 'kwrzSOf',
              street: 'AOGyUkg',
              house: 65,
              flat: 92
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T16:45:00.000Z',
          action: 'All products received'
        },
        {
          status: 'Partially Received',
          customer: '67b481209f31117d8c5842b0',
          products: [
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: true
            },
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            }
          ],
          total_price: 130740,
          delivery: {
            address: {
              country: 'Canada',
              city: 'kwrzSOf',
              street: 'AOGyUkg',
              house: 65,
              flat: 92
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Received'
        },
        {
          status: 'In Process',
          customer: '67b481209f31117d8c5842b0',
          products: [
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            },
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            }
          ],
          total_price: 130740,
          delivery: {
            address: {
              country: 'Canada',
              city: 'kwrzSOf',
              street: 'AOGyUkg',
              house: 65,
              flat: 92
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Order processing started'
        },
        {
          status: 'Draft',
          customer: '67b481209f31117d8c5842b0',
          products: [
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            },
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            }
          ],
          total_price: 130740,
          delivery: {
            address: {
              country: 'Canada',
              city: 'kwrzSOf',
              street: 'AOGyUkg',
              house: 65,
              flat: 92
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Delivery Scheduled'
        },
        {
          status: 'Draft',
          customer: '67b481209f31117d8c5842b0',
          products: [
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            },
            {
              _id: '67b481219f31117d8c5842b9',
              name: 'Chicken27009',
              amount: 557,
              price: 65370,
              manufacturer: 'Tesla',
              notes:
                'Ovs9oeseSt7MpO2aFFceTbbtTaGAlGU9qh5CFG6wVpSZq8aKoM3lGn5l5jmh0PwV9yfLnCFN7ibvUDJvo4X4Y8Qn3lNGoVgwHmzj9Yj2qGZkqAoiHp3IKu6ZtjGwZ300jCDMj1NQTxgUgffwJIoXrtKJH4UYG6yh0qaS7WE8klVYDvCfmpvE4HqsgrcKalZjnNoSWUIyixbgDYQleAbT9wwhYjDBsv91bVWr97EpZytnAIAO5lpTKw5YJX',
              received: false
            }
          ],
          total_price: 130740,
          delivery: null,
          changedOn: '2025-02-18T12:46:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b480ef9f31117d8c584217',
      status: 'Partially Received',
      customer: {
        _id: '67b480ee9f31117d8c58420c',
        email: '1739882734326Zander.Walter72@gmail.com',
        name: 'kjGHGAqXpJBGDDroOzmdRZZGaRCVXFhfoaS',
        country: 'Ukraine',
        city: 'City EEypZMDmBWSieAc',
        street: 'Street gTsjhU50nsGpgOvNjGudSgvIVPCUk8eo7',
        house: 330,
        flat: 8712,
        phone: '+691494078133',
        createdOn: '2025-02-18T12:45:00.000Z',
        notes:
          'Notes yeThnrAhEBieikgEwXBAWgxIyaUohzUYUIETXOJEgClucLRmrvEWxrAksLKgUSXVwxeKVtNTBeclNGyswaqFFljzBOfiFoDUjdBggwKkztOHvQxnMTmvnDikOHeBJUXULAVgSVoFgIGUbGjpxljclNaEIhscExPPorYneXIHEMwzvHWKzoEBHZvCkGLYYliioFVFxoPSpzpZBrqtGWZDVOQQqlLaJJavzlqErlvRmldqnVxSUjhB'
      },
      products: [
        {
          _id: '67b480ef9f31117d8c584210',
          name: 'Bike85446',
          amount: 177,
          price: 60313,
          manufacturer: 'Xiaomi',
          notes:
            '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
          received: true
        },
        {
          _id: '67b480ef9f31117d8c584210',
          name: 'Bike85446',
          amount: 177,
          price: 60313,
          manufacturer: 'Xiaomi',
          notes:
            '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
          received: false
        }
      ],
      delivery: {
        address: {
          country: 'Great Britain',
          city: 'SNMjJxd',
          street: 'IgMpyxi',
          house: 97,
          flat: 70
        },
        finalDate: '2025-02-23T00:00:00.000Z',
        condition: 'Pickup'
      },
      total_price: 120626,
      createdOn: '2025-02-18T12:45:00.000Z',
      comments: [],
      history: [
        {
          status: 'Partially Received',
          customer: '67b480ee9f31117d8c58420c',
          products: [
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: true
            },
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            }
          ],
          total_price: 120626,
          delivery: {
            address: {
              country: 'Great Britain',
              city: 'SNMjJxd',
              street: 'IgMpyxi',
              house: 97,
              flat: 70
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Received'
        },
        {
          status: 'In Process',
          customer: '67b480ee9f31117d8c58420c',
          products: [
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            },
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            }
          ],
          total_price: 120626,
          delivery: {
            address: {
              country: 'Great Britain',
              city: 'SNMjJxd',
              street: 'IgMpyxi',
              house: 97,
              flat: 70
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Order processing started'
        },
        {
          status: 'Draft',
          customer: '67b480ee9f31117d8c58420c',
          products: [
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            },
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            }
          ],
          total_price: 120626,
          delivery: {
            address: {
              country: 'Great Britain',
              city: 'SNMjJxd',
              street: 'IgMpyxi',
              house: 97,
              flat: 70
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Delivery Scheduled'
        },
        {
          status: 'Draft',
          customer: '67b480ee9f31117d8c58420c',
          products: [
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            },
            {
              _id: '67b480ef9f31117d8c584210',
              name: 'Bike85446',
              amount: 177,
              price: 60313,
              manufacturer: 'Xiaomi',
              notes:
                '4uCnl9abV9JbHiBRUXSW8wiFvhm8iI4JuYJd4M8k9yFmufQDZ16IGbfxg46yxmZXz9PNwseafcTS5JXzgEOQnBRDpAx5Orqv00WWpHBE4jxkFejWtBS87NKrJsCRcoQFwxiQVbq0OvxvCWlBWVVyp7dOVkoRlefLdkmTwvRsEgZAVhA70xVfMWwYxeXbD8RbMzX9D8jAqkO0aPThvlO56C6qvnGr9OqpBvoJJJDeDbsrrCCmj6ZFWVSXWY',
              received: false
            }
          ],
          total_price: 120626,
          delivery: null,
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b481069f31117d8c584260',
      status: 'Received',
      customer: {
        _id: '67b481059f31117d8c584257',
        email: '1739882757194Delfina62@hotmail.com',
        name: 'iQBfhKjxpUqqTVkXjNlQZkTzEeXmSPoJeDD',
        country: 'Germany',
        city: 'City CjxqNyaveUBLpvp',
        street: 'Street s6bhYBJ1Bs9seIMFtf08JhiWV44Fmrs3n',
        house: 905,
        flat: 3368,
        phone: '+461688087674',
        createdOn: '2025-02-18T12:45:00.000Z',
        notes:
          'Notes hMzgcVGfYXQNCgjOZYcRePgwbIOXpcyKdFqezjjNlKwmPCkIuXCQjmpzJjClYxuTSaptGlonZZafUGAZkdSWUhJXVxbFQmVPGoRaaqapXdLwsfWbbquMSxYUinYPkjmrOXLIzHsMYfkScddacJntlwExDUPzvTXroncYpDTHMxyhtcfZYHKvPsVbZePTTIIUECeQvBfwWqupsLkCRoLiILAxZyfQSLdBdNPNKcRrwmJzusgrRfyy'
      },
      products: [
        {
          _id: '67b481069f31117d8c58425b',
          name: 'Fish34422',
          amount: 706,
          price: 15942,
          manufacturer: 'Microsoft',
          notes:
            'g2K1DrbKtjeKTRxLyVrX3OWWkpQQP8JQflDnOyrPCk1OoVejUVT3FwltPYIfV1rGP97vWLzPaXapeCZ7FwCFURonaD2e0ekaLD3qWie0RyKvz6tXSw1BuVbAOhveDdvJhVkeuyVAKTbFhgwdd93BOWvioN7kWWHb4w2gfQK9HL9k1fdah06NEiyL0iM4oD55ahCEHdOJ4d44rvxr0gVjZ0UcugYO2eaTb3g0KmWvVL0MTxPgUiCT16pVN1',
          received: true
        }
      ],
      delivery: {
        address: {
          country: 'Great Britain',
          city: 'BobLcXb',
          street: 'ZbJIUGl',
          house: 3,
          flat: 61
        },
        finalDate: '2025-02-23T00:00:00.000Z',
        condition: 'Delivery'
      },
      total_price: 15942,
      createdOn: '2025-02-18T12:45:00.000Z',
      comments: [],
      history: [
        {
          status: 'Received',
          customer: '67b481059f31117d8c584257',
          products: [
            {
              _id: '67b481069f31117d8c58425b',
              name: 'Fish34422',
              amount: 706,
              price: 15942,
              manufacturer: 'Microsoft',
              notes:
                'g2K1DrbKtjeKTRxLyVrX3OWWkpQQP8JQflDnOyrPCk1OoVejUVT3FwltPYIfV1rGP97vWLzPaXapeCZ7FwCFURonaD2e0ekaLD3qWie0RyKvz6tXSw1BuVbAOhveDdvJhVkeuyVAKTbFhgwdd93BOWvioN7kWWHb4w2gfQK9HL9k1fdah06NEiyL0iM4oD55ahCEHdOJ4d44rvxr0gVjZ0UcugYO2eaTb3g0KmWvVL0MTxPgUiCT16pVN1',
              received: true
            }
          ],
          total_price: 15942,
          delivery: {
            address: {
              country: 'Great Britain',
              city: 'BobLcXb',
              street: 'ZbJIUGl',
              house: 3,
              flat: 61
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Delivery'
          },
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'All products received'
        },
        {
          status: 'In Process',
          customer: '67b481059f31117d8c584257',
          products: [
            {
              _id: '67b481069f31117d8c58425b',
              name: 'Fish34422',
              amount: 706,
              price: 15942,
              manufacturer: 'Microsoft',
              notes:
                'g2K1DrbKtjeKTRxLyVrX3OWWkpQQP8JQflDnOyrPCk1OoVejUVT3FwltPYIfV1rGP97vWLzPaXapeCZ7FwCFURonaD2e0ekaLD3qWie0RyKvz6tXSw1BuVbAOhveDdvJhVkeuyVAKTbFhgwdd93BOWvioN7kWWHb4w2gfQK9HL9k1fdah06NEiyL0iM4oD55ahCEHdOJ4d44rvxr0gVjZ0UcugYO2eaTb3g0KmWvVL0MTxPgUiCT16pVN1',
              received: false
            }
          ],
          total_price: 15942,
          delivery: {
            address: {
              country: 'Great Britain',
              city: 'BobLcXb',
              street: 'ZbJIUGl',
              house: 3,
              flat: 61
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Delivery'
          },
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Order processing started'
        },
        {
          status: 'Draft',
          customer: '67b481059f31117d8c584257',
          products: [
            {
              _id: '67b481069f31117d8c58425b',
              name: 'Fish34422',
              amount: 706,
              price: 15942,
              manufacturer: 'Microsoft',
              notes:
                'g2K1DrbKtjeKTRxLyVrX3OWWkpQQP8JQflDnOyrPCk1OoVejUVT3FwltPYIfV1rGP97vWLzPaXapeCZ7FwCFURonaD2e0ekaLD3qWie0RyKvz6tXSw1BuVbAOhveDdvJhVkeuyVAKTbFhgwdd93BOWvioN7kWWHb4w2gfQK9HL9k1fdah06NEiyL0iM4oD55ahCEHdOJ4d44rvxr0gVjZ0UcugYO2eaTb3g0KmWvVL0MTxPgUiCT16pVN1',
              received: false
            }
          ],
          total_price: 15942,
          delivery: {
            address: {
              country: 'Great Britain',
              city: 'BobLcXb',
              street: 'ZbJIUGl',
              house: 3,
              flat: 61
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Delivery'
          },
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Delivery Scheduled'
        },
        {
          status: 'Draft',
          customer: '67b481059f31117d8c584257',
          products: [
            {
              _id: '67b481069f31117d8c58425b',
              name: 'Fish34422',
              amount: 706,
              price: 15942,
              manufacturer: 'Microsoft',
              notes:
                'g2K1DrbKtjeKTRxLyVrX3OWWkpQQP8JQflDnOyrPCk1OoVejUVT3FwltPYIfV1rGP97vWLzPaXapeCZ7FwCFURonaD2e0ekaLD3qWie0RyKvz6tXSw1BuVbAOhveDdvJhVkeuyVAKTbFhgwdd93BOWvioN7kWWHb4w2gfQK9HL9k1fdah06NEiyL0iM4oD55ahCEHdOJ4d44rvxr0gVjZ0UcugYO2eaTb3g0KmWvVL0MTxPgUiCT16pVN1',
              received: false
            }
          ],
          total_price: 15942,
          delivery: null,
          changedOn: '2025-02-18T12:45:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b480669f31117d8c58419e',
      status: 'Partially Received',
      customer: {
        _id: '67b480659f31117d8c584193',
        email: '1739882597375Justice.Rosenbaum37@hotmail.com',
        name: 'IyJhMwwEHCDrtSeLADCZFdHEgOrxRXXCrCf',
        country: 'Germany',
        city: 'City nVJnjCWrsoqoRrr',
        street: 'Street 8otwOyMc5b14SmQbDNyMhIpDxOibSLurB',
        house: 43,
        flat: 6443,
        phone: '+344804769556',
        createdOn: '2025-02-18T12:43:00.000Z',
        notes:
          'Notes yaBrLjpoSwTPNgPYKJnkSgOBrtjoGzYvyABbHBgBncKzEkRGcqSBXwcphBKCmuzdYDBUVsixqRArfdqkCzDVIHTctfcClYBHywCjfYoXIrqyoYBlLGEGkGgPUAEmWIRwoqezZzdCpIWjCCXkOPyxpFAURzUVdACyzIQMzoqUsicwzxFhCFQNioNcSdFyBSPdyZjoaOxYFdNYFCMspmSJPBNTAgRRebqjIBJDzBUPpQJHxRJmgRho'
      },
      products: [
        {
          _id: '67b480669f31117d8c584197',
          name: 'Chair44688',
          amount: 711,
          price: 32599,
          manufacturer: 'Sony',
          notes:
            '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
          received: true
        },
        {
          _id: '67b480669f31117d8c584197',
          name: 'Chair44688',
          amount: 711,
          price: 32599,
          manufacturer: 'Sony',
          notes:
            '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
          received: false
        }
      ],
      delivery: {
        address: {
          country: 'Canada',
          city: 'owyEtWU',
          street: 'WsuYksF',
          house: 87,
          flat: 73
        },
        finalDate: '2025-02-23T00:00:00.000Z',
        condition: 'Pickup'
      },
      total_price: 65198,
      createdOn: '2025-02-18T12:43:00.000Z',
      comments: [],
      history: [
        {
          status: 'Partially Received',
          customer: '67b480659f31117d8c584193',
          products: [
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: true
            },
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            }
          ],
          total_price: 65198,
          delivery: {
            address: {
              country: 'Canada',
              city: 'owyEtWU',
              street: 'WsuYksF',
              house: 87,
              flat: 73
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:43:00.000Z',
          action: 'Received'
        },
        {
          status: 'In Process',
          customer: '67b480659f31117d8c584193',
          products: [
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            },
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            }
          ],
          total_price: 65198,
          delivery: {
            address: {
              country: 'Canada',
              city: 'owyEtWU',
              street: 'WsuYksF',
              house: 87,
              flat: 73
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:43:00.000Z',
          action: 'Order processing started'
        },
        {
          status: 'Draft',
          customer: '67b480659f31117d8c584193',
          products: [
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            },
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            }
          ],
          total_price: 65198,
          delivery: {
            address: {
              country: 'Canada',
              city: 'owyEtWU',
              street: 'WsuYksF',
              house: 87,
              flat: 73
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Pickup'
          },
          changedOn: '2025-02-18T12:43:00.000Z',
          action: 'Delivery Scheduled'
        },
        {
          status: 'Draft',
          customer: '67b480659f31117d8c584193',
          products: [
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            },
            {
              _id: '67b480669f31117d8c584197',
              name: 'Chair44688',
              amount: 711,
              price: 32599,
              manufacturer: 'Sony',
              notes:
                '9H8IUlf4xweiZn8apebL8osR7QzD7j5E2XjvUobFhfLg5ocyC8ZHCf9ZABnlwPYhm4R4qZx4PMZBClkNddNVaA5IFAmZL5UxSfhxloaYXF3tx4SCV7R1BUKE4ejL1hwoJN4LdtgvaKDisxZxkxvE813jObRwBVXbN2RbzcaGobGBRhRrhDnIlgt8mtgnekPctfcbKzARToEfbMRe3YvHVMXl8nAwk6fc102eohz4dmGdp0UONpDL23K0Dx',
              received: false
            }
          ],
          total_price: 65198,
          delivery: null,
          changedOn: '2025-02-18T12:43:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b4807c9f31117d8c5841f4',
      status: 'Draft',
      customer: {
        _id: '67b480759f31117d8c5841d0',
        email: '1739882613499Kayleigh.OHara@yahoo.com',
        name: 'Name qvdsGBlwdmSQBDVJMiZcdQkmyuFREmllcgf',
        country: 'Great Britain',
        city: 'City XwDoPXlDdTlxafI',
        street: 'Street GoZlxyDLaRICvdA78BaRdhIAhWnoZCc4O',
        house: 864,
        flat: 5394,
        phone: '+261123598886',
        createdOn: '2025-02-18T12:43:00.000Z',
        notes:
          'Notes PLPHXuaagSvyuCXBIIwPnABnwtpDXmpazkVmjbpfLdXfQkDzrWaZeGtDwrRfAXiIhiBEdcxposPZfUEiYbaMgEilXvsKxCHKdkuCmsFERBtOUJQNequpjFFTOBJQptoevxJAUFjtOyLRERSnMahDBTsoBMdEiSaCGLOBcYlbmXbdGynndpwtXIqUbeHCFmjFStNHcvKYibvLDljXQSjLYdElCIzAMqhaKMQdtXhsqiNtJBuBBwze'
      },
      products: [
        {
          _id: '67b480769f31117d8c5841d3',
          name: 'Bacon87949',
          amount: 39,
          price: 22890,
          manufacturer: 'Microsoft',
          notes:
            'hItKPyWe4n5dIyk1ovbizBO7jrC85qAR5ARK3IdSxZ6fL7VVK8DVWs88CX9ywyR0M3479uSLi0AJVNXOq1An1or6lrVYH8Ior7By2uk047xPS5WQGay3jCg4LPr016gGnFZkCQNqBsCF8ZaZHrDgrlb3nKQgducRHNGafVGqG08xWMF3yfDpGGFfgA2tNeciiTguusd5pdGj7W20Ymd1n5aL3QtLEJObcRrF2rVzMAtUnaBkMSGUfPgxap',
          received: false
        },
        {
          _id: '67b480769f31117d8c5841d6',
          name: 'Cheese48660',
          amount: 379,
          price: 13815,
          manufacturer: 'Samsung',
          notes:
            'DzgUHBQClNZaWX57642urJTAb63HXHf98ZG4WhZWCyVDH2FMI3CyaOtrcNSk5XqUmvpwTbdexse5HO8cqMYHIDqaGHPBXgVffyzI6KWoC5f4j0k46SL0RoJjL5WGKw9i6SlszE1hR4ZfTnzJfyYlDbKa52N70IOtl4x2aohl9qwUoYMuQzDixM8pYKmmolcT6fkewCrKNuurHi9nduMMpRQKHe1EjJXN9THeFJuQYgjvqgRMIY1F1NRee2',
          received: false
        }
      ],
      delivery: null,
      total_price: 36705,
      createdOn: '2025-02-18T12:43:00.000Z',
      comments: [],
      history: [
        {
          status: 'Draft',
          customer: '67b480759f31117d8c5841d0',
          products: [
            {
              _id: '67b480769f31117d8c5841d3',
              name: 'Bacon87949',
              amount: 39,
              price: 22890,
              manufacturer: 'Microsoft',
              notes:
                'hItKPyWe4n5dIyk1ovbizBO7jrC85qAR5ARK3IdSxZ6fL7VVK8DVWs88CX9ywyR0M3479uSLi0AJVNXOq1An1or6lrVYH8Ior7By2uk047xPS5WQGay3jCg4LPr016gGnFZkCQNqBsCF8ZaZHrDgrlb3nKQgducRHNGafVGqG08xWMF3yfDpGGFfgA2tNeciiTguusd5pdGj7W20Ymd1n5aL3QtLEJObcRrF2rVzMAtUnaBkMSGUfPgxap',
              received: false
            },
            {
              _id: '67b480769f31117d8c5841d6',
              name: 'Cheese48660',
              amount: 379,
              price: 13815,
              manufacturer: 'Samsung',
              notes:
                'DzgUHBQClNZaWX57642urJTAb63HXHf98ZG4WhZWCyVDH2FMI3CyaOtrcNSk5XqUmvpwTbdexse5HO8cqMYHIDqaGHPBXgVffyzI6KWoC5f4j0k46SL0RoJjL5WGKw9i6SlszE1hR4ZfTnzJfyYlDbKa52N70IOtl4x2aohl9qwUoYMuQzDixM8pYKmmolcT6fkewCrKNuurHi9nduMMpRQKHe1EjJXN9THeFJuQYgjvqgRMIY1F1NRee2',
              received: false
            }
          ],
          total_price: 36705,
          delivery: null,
          changedOn: '2025-02-18T12:43:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b480239f31117d8c58415f',
      status: 'In Process',
      customer: {
        _id: '67b480229f31117d8c584154',
        email: '1739882530079Jarrell.Rolfson@hotmail.com',
        name: 'mPwsvFwSmioRZjYRoLhGYZzHRUFlGhmdOLD',
        country: 'Russia',
        city: 'City apyVmOCKXBJewdX',
        street: 'Street fBf7MeksXGaIthxETb5ym1WSEAg7vB6xC',
        house: 506,
        flat: 8156,
        phone: '+919150103497',
        createdOn: '2025-02-18T12:42:00.000Z',
        notes:
          'Notes oiuNWIOclrjkZXyYyRqMjQtJQyiBnlahpymdFEDFVDSZRCTcQTlrONOOFuvoCaFXZidiLioqVaIDEwVkMIoKevkyYsVLpcRPLrXVvZRzSuWJQMSTvuSnZATlpgaITWoOgOwlfWcYQMOaWPDoMLKFNTdmNjFFuhgxBXxBssTYcUyVXzvUTGWODxwVNfcxvdVDvIUaLgsfnCtCjxJSszEtQkIskeICLeXQGYkKGJQSTskpzMpsJYQK'
      },
      products: [
        {
          _id: '67b480239f31117d8c584158',
          name: 'Car65225',
          amount: 742,
          price: 74942,
          manufacturer: 'Amazon',
          notes:
            '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
          received: false
        },
        {
          _id: '67b480239f31117d8c584158',
          name: 'Car65225',
          amount: 742,
          price: 74942,
          manufacturer: 'Amazon',
          notes:
            '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
          received: false
        }
      ],
      delivery: {
        address: {
          country: 'Ukraine',
          city: 'jfprdcm',
          street: 'akTnQif',
          house: 28,
          flat: 72
        },
        finalDate: '2025-02-23T00:00:00.000Z',
        condition: 'Delivery'
      },
      total_price: 149884,
      createdOn: '2025-02-18T12:42:00.000Z',
      comments: [],
      history: [
        {
          status: 'In Process',
          customer: '67b480229f31117d8c584154',
          products: [
            {
              _id: '67b480239f31117d8c584158',
              name: 'Car65225',
              amount: 742,
              price: 74942,
              manufacturer: 'Amazon',
              notes:
                '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
              received: false
            },
            {
              _id: '67b480239f31117d8c584158',
              name: 'Car65225',
              amount: 742,
              price: 74942,
              manufacturer: 'Amazon',
              notes:
                '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
              received: false
            }
          ],
          total_price: 149884,
          delivery: {
            address: {
              country: 'Ukraine',
              city: 'jfprdcm',
              street: 'akTnQif',
              house: 28,
              flat: 72
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Delivery'
          },
          changedOn: '2025-02-18T12:42:00.000Z',
          action: 'Order processing started'
        },
        {
          status: 'Draft',
          customer: '67b480229f31117d8c584154',
          products: [
            {
              _id: '67b480239f31117d8c584158',
              name: 'Car65225',
              amount: 742,
              price: 74942,
              manufacturer: 'Amazon',
              notes:
                '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
              received: false
            },
            {
              _id: '67b480239f31117d8c584158',
              name: 'Car65225',
              amount: 742,
              price: 74942,
              manufacturer: 'Amazon',
              notes:
                '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
              received: false
            }
          ],
          total_price: 149884,
          delivery: {
            address: {
              country: 'Ukraine',
              city: 'jfprdcm',
              street: 'akTnQif',
              house: 28,
              flat: 72
            },
            finalDate: '2025-02-23T00:00:00.000Z',
            condition: 'Delivery'
          },
          changedOn: '2025-02-18T12:42:00.000Z',
          action: 'Delivery Scheduled'
        },
        {
          status: 'Draft',
          customer: '67b480229f31117d8c584154',
          products: [
            {
              _id: '67b480239f31117d8c584158',
              name: 'Car65225',
              amount: 742,
              price: 74942,
              manufacturer: 'Amazon',
              notes:
                '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
              received: false
            },
            {
              _id: '67b480239f31117d8c584158',
              name: 'Car65225',
              amount: 742,
              price: 74942,
              manufacturer: 'Amazon',
              notes:
                '5Q5M3R32yIOjc1VXE70Ud85nmRqM8r7LR6wU9BwWKc6tEwJ4T8jWItkHHnLkC9ZxUQUZDdlkFk5XTQPU2E02KyAz4FcoyRIm7CVOU1i2xpzJAVqkJnQaAHllP6ADYKNHOhQFBAhxaUQzVPM5zdU0KftQ6AJZS5N9AgTW5d5WBN853DXK7p65KxWNHCqOZQnR3EyGz6F71utxneKWCwJktVvGLnVWhTBlKuihG7JdMz2CLpVm5JnX6avEJM',
              received: false
            }
          ],
          total_price: 149884,
          delivery: null,
          changedOn: '2025-02-18T12:42:00.000Z',
          action: 'Order created'
        }
      ]
    },
    {
      _id: '67b47fea9f31117d8c58413f',
      status: 'Draft',
      customer: {
        _id: '67b47fe59f31117d8c584123',
        email: '1739882468883Eleonore49@yahoo.com',
        name: 'Name LwEoccNJoxWywwaeUpEJnMloGhKhaYVeFVb',
        country: 'USA',
        city: 'City hSohgDxDNrmbmwM',
        street: 'Street y4ZIFAAks7uy1JE1Fw7bQjt4VllsV3Xgh',
        house: 888,
        flat: 7570,
        phone: '+602961691997',
        createdOn: '2025-02-18T12:41:00.000Z',
        notes:
          'Notes kXUbWatsZSemgMGxxxZOEmwhhJoJpiLmIjpgPDsKVnSHEZJEJpFMRPHKtmBgMdDFQAxtNfcbaFLvvZPUJCZkHzZZgjHZwmUGFSdkaHBrexjQcSVgXuswkaGgPvJyMgviVyISahbTemcvHfcnySkrJzlrNSmYZlDVGGcQSHRzInmOCKhTjmmCCckjZUeLVvYMVTXFgVveLxHRoYFIQFycVUUNlppnGehpMaTEcLjGBgEOyCcaVARL'
      },
      products: [
        {
          _id: '67b47fe59f31117d8c584126',
          name: 'Table29677',
          amount: 286,
          price: 70296,
          manufacturer: 'Xiaomi',
          notes:
            'bgx9Hkb7aNVcSft1LNL8Y6ixs6UOcJYtf9i4Hm8ENrpqCxTdxtk6jo1Zaq2wAstB7i8kIdM5dBkT5tMpGBEcRm8xrCRDD3hHYHvNMoV4BYtePXFSp9OjnRNn1Hx9rsKfqgsu8F1cCp4MfVvmdzt5HGFhyJAGpgk6sw5osrji7de2LgWUq27pZ8BSxeBqxhpUYiVMS9Z8TesA8rTannZCYlMaCHYNBxSS8W0kDnQEWyr7hGclTamo8LcLjx',
          received: false
        }
      ],
      delivery: null,
      total_price: 70296,
      createdOn: '2025-02-18T12:41:00.000Z',
      comments: [],
      history: [
        {
          status: 'Draft',
          customer: '67b47fe59f31117d8c584123',
          products: [
            {
              _id: '67b47fe59f31117d8c584126',
              name: 'Table29677',
              amount: 286,
              price: 70296,
              manufacturer: 'Xiaomi',
              notes:
                'bgx9Hkb7aNVcSft1LNL8Y6ixs6UOcJYtf9i4Hm8ENrpqCxTdxtk6jo1Zaq2wAstB7i8kIdM5dBkT5tMpGBEcRm8xrCRDD3hHYHvNMoV4BYtePXFSp9OjnRNn1Hx9rsKfqgsu8F1cCp4MfVvmdzt5HGFhyJAGpgk6sw5osrji7de2LgWUq27pZ8BSxeBqxhpUYiVMS9Z8TesA8rTannZCYlMaCHYNBxSS8W0kDnQEWyr7hGclTamo8LcLjx',
              received: false
            }
          ],
          total_price: 70296,
          delivery: null,
          changedOn: '2025-02-18T12:41:00.000Z',
          action: 'Order created'
        }
      ]
    }
  ],
  IsSuccess: true,
  ErrorMessage: null
};
