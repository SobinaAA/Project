import { simpleSchemaPart } from './base.schema';

export const validationErrorSchema = {
  ...simpleSchemaPart,
  required: ['IsSuccess', 'ErrorMessage']
};
