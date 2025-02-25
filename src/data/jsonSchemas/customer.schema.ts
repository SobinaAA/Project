import { COUNTRIES } from 'data/customers/countries';
import { baseSchemaPart } from 'data/jsonSchemas/base.schema';

export const customerSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    house: {
      type: 'number'
    },
    flat: {
      type: 'number'
    },
    street: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    country: {
      type: 'string',
      enum: Object.values(COUNTRIES)
    },
    createdOn: {
      type: 'string'
    },
    notes: {
      type: 'string'
    }
  },
  required: [
    '_id',
    'email',
    'name',
    'country',
    'street',
    'city',
    'createdOn',
    'house',
    'flat',
    'phone'
  ]
};

export const oneCustomerSchema = {
  type: 'object',
  properties: {
    Customer: {
      ...customerSchema
    },
    ...baseSchemaPart
  },
  required: ['Customer', 'IsSuccess', 'ErrorMessage']
};

export const allCustomersResponseSchema = {
  type: 'object',
  properties: {
    Customers: {
      type: 'array',
      items: customerSchema
    },
    ...baseSchemaPart
  },
  required: ['Customers', 'IsSuccess', 'ErrorMessage']
};
