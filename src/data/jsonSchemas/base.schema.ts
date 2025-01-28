export const baseSchemaPart = {
  IsSuccess: {
    type: 'boolean'
  },
  ErrorMessage: {
    type: ['string', 'null']
  }
};

export const simpleSchemaPart = {
    type: 'object',
    properties: {
    IsSuccess: {
      type: 'boolean'
    },
    ErrorMessage: {
      type: ['string', 'null']
    }
  }
}