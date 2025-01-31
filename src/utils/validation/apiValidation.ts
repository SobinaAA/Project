import Ajv from 'ajv';
import { expect } from 'chai';
import { IResponseFields, IResponse } from '../../data/types/api.types';

export function validateJsonSchema<T extends IResponseFields>(
  schema: object,
  response: IResponse<T>
) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    console.log(validate.errors);
  }
  expect(isValidSchema, 'Response body should match JSON schema').to.be.true;
}

export function validateResponse<T extends IResponseFields>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
) {
  expect(response.status, `Status code should match expected`).to.equal(status);
  expect(response.body.IsSuccess, `IsSuccess should match expected`).to.equal(
    IsSuccess
  );
  expect(
    response.body.ErrorMessage,
    `ErrorMessage should match expected`
  ).to.equal(ErrorMessage);
}
