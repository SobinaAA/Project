import { baseSchemaPart } from 'data/jsonSchemas/base.schema';
import { customerSchema } from './customer.schema';
import { productOrderSchema } from './product.schema';
import { COUNTRIES } from 'data/customers/countries';
import { DELIVERY } from 'data/orders/delivery';
import { ORDER_STATUS } from 'data/orders/statuses';

export const addressSchema = {
  type: 'object',
  properties: {
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
    country: {
      type: 'string',
      enum: Object.values(COUNTRIES)
    }
  },
  required: ['city', 'house', 'flat', 'street', 'country']
};
const deliverySchema = {
  type: 'object',
  properties: {
    finalDate: {
      type: 'string'
    },
    condition: {
      type: 'string',
      enum: Object.values(DELIVERY)
    },
    address: {
      ...addressSchema
    }
  },
  required: ['finalDate', 'condition', 'address']
};
const commentSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    text: {
      type: 'string'
    },
    createdOn: {
      type: 'string'
    }
  },
  required: ['_id', 'text', 'createdOn']
};

const historySchema = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: Object.values(ORDER_STATUS) },
    customer: {
      type: 'string'
    },
    products: {
      type: 'array',
      items: productOrderSchema
    },
    total_price: {
      type: 'number'
    },
    changedOn: {
      type: 'string'
    },
    delivery: {
      anyOf: [
        { ...deliverySchema }, // Объект delivery
        { type: 'null' } // Или null
      ]
    }
  },
  required: [
    'status',
    'customer',
    'products',
    'total_price',
    'changedOn',
    'delivery'
  ]
};

export const orderSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    status: { type: 'string', enum: Object.values(ORDER_STATUS) },
    customer: {
      ...customerSchema
    },
    products: {
      type: 'array',
      items: productOrderSchema
    },
    total_price: {
      type: 'number'
    },
    createdOn: {
      type: 'string'
    },
    delivery: {
      anyOf: [
        { ...deliverySchema }, // Объект delivery
        { type: 'null' } // Или null
      ]
    },
    comments: {
      // Массив может быть пуст
      type: 'array',
      items: commentSchema
    },
    history: {
      type: 'array',
      items: historySchema
    }
  },
  required: ['_id', 'products', 'total_price', 'customer', 'createdOn']
};

export const oneOrderSchema = {
  type: 'object',
  properties: {
    Order: {
      ...orderSchema
    },
    ...baseSchemaPart
  },
  required: ['Order', 'IsSuccess', 'ErrorMessage']
};

export const allOrdersResponseSchema = {
  type: 'object',
  properties: {
    Orders: {
      type: 'array',
      items: orderSchema
    },
    ...baseSchemaPart
  },
  required: ['Orders', 'IsSuccess', 'ErrorMessage']
};
