import { MANUFACTURERS } from 'data/types/product.types';
import { baseSchemaPart } from 'data/jsonSchemas/base.schema';

export const productResponseSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    amount: {
      type: 'number'
    },
    price: {
      type: 'number'
    },
    manufacturer: {
      type: 'string',
      enum: Object.values(MANUFACTURERS)
    },
    createdOn: {
      type: 'string'
      // format: "date-time",
    },
    notes: {
      type: 'string'
    }
  },
  required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
  additionalProperties: false
};

export const oneProductResponseSchema = {
  type: 'object',
  properties: {
    Product: {
      ...productResponseSchema
    },
    ...baseSchemaPart
  },
  required: ['Product', 'IsSuccess', 'ErrorMessage']
};

export const allProductsResponseSchema = {
  type: 'object',
  properties: {
    Products: {
      type: 'array',
      items: productResponseSchema
    },
    ...baseSchemaPart
  },
  required: ['Products', 'IsSuccess', 'ErrorMessage']
};
