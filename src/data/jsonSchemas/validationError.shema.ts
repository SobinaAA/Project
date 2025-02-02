import { simpleSchemaPart } from 'data/jsonSchemas/base.schema';

export const validationErrorSchema = {
  ...simpleSchemaPart,
  required: ['IsSuccess', 'ErrorMessage']
};
