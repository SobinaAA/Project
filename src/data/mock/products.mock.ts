import { generateProductFromResponse } from 'data/products/generateProduct';
import { IProductsResponse, MANUFACTURERS } from 'data/types/product.types';

export const productEmptyPageMock = {
  Product: [],
  IsSuccess: true,
  ErrorMessage: null
};

export const productMock = {
  Product: {
    _id: '67ad1e829f31117d8c547eeb',
    name: 'I_Am_MockProduct',
    amount: 1,
    price: 100500,
    manufacturer: MANUFACTURERS.SONY,
    house: 12,
    createdOn: '2025-02-07T09:31:00.000Z',
    notes: 'Hello, world!'
  },
  IsSuccess: true,
  ErrorMessage: null
};

export const productsMock = {
  Products: [productMock.Product],
  IsSuccess: true,
  ErrorMessage: null
};

export const productsListMock = {
  Products: [
    {
      _id: '67a335j49f31117d8c5137f8',
      name: 'I_Am_MockProduct',
      amount: 1,
      price: 100500,
      manufacturer: 'Sony',
      house: 12,
      createdOn: '2025-02-07T09:31:00.000Z',
      notes: 'Hello, world!'
    }
  ],
  IsSuccess: true,
  ErrorMessage: null
};

export class ProductsMockBuilder {
  private data: IProductsResponse = {
    Products: [],
    IsSuccess: true,
    ErrorMessage: null,
    sorting: {
      sortField: 'createdOn',
      sortOrder: 'asc'
    }
  };

  build() {
    return this.data;
  }

  setSorting(
    sortField: IProductsResponse['sorting']['sortField'],
    sortOrder: IProductsResponse['sorting']['sortOrder']
  ) {
    this.data.sorting = { sortField, sortOrder };
    return this;
  }

  setProduct() {
    this.data.Products.push({
      _id: '67a335j49f31117d8c5137f8',
      name: 'I_Am_MockProduct',
      amount: 1,
      price: 100500,
      manufacturer: MANUFACTURERS.SONY,
      createdOn: '2025-02-07T09:31:00.000Z',
      notes: 'Hello, world!'
    });
    return this;
  }

  setRandomProduct() {
    this.data.Products.push(generateProductFromResponse());
    return this;
  }
}
