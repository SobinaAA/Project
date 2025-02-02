import Ajv from 'ajv';
import { expect } from 'chai';
import { IResponseFields, IResponse } from 'data/types/api.types';

/**
 * Validate that the body of an API response matches a given JSON schema.
 *
 * @param {object} schema JSON schema to validate the response against
 * @param {IResponse<T>} response API response to validate
 */
export function validateJsonSchema<T>(schema: object, response: IResponse<T>) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    console.log(validate.errors);
  }
  expect(isValidSchema, 'Response body should match JSON schema').to.be.true;
}

/**
 * Validate an API response with status code.
 *
 * @param response API response to validate
 * @param status Expected HTTP status code
 */
export function validateResponse<T>(
  response: IResponse<T>,
  status: number
): void;
/**
 * Validate an API response against a set of expected values.
 *
 * @param response API response to validate
 * @param status Expected HTTP status code
 * @param IsSuccess Expected value of the IsSuccess field
 * @param ErrorMessage Expected value of the ErrorMessage field
 */
export function validateResponse<T>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
): void;
export function validateResponse<T>(
  response: IResponse<T>,
  status: number,
  IsSuccess?: boolean,
  ErrorMessage?: null | string
) {
  expect(response.status, `Status code should match expected`).to.equal(status);
  if (isWithIsSuccess(response)) {
    expect(response.body.IsSuccess, `IsSuccess should match expected`).to.equal(
      IsSuccess
    );
    expect(
      response.body.ErrorMessage,
      `ErrorMessage should match expected`
    ).to.equal(ErrorMessage);
  }
}

/**
 * Checks if the given response body is an IResponseFields object.
 *
 * The checks are:
 * - The body is an object
 * - The body is not null
 * - The body has IsSuccess property
 * - The body has ErrorMessage property
 *
 * It is a type guard that narrows the type of the response argument to
 * IResponse<IResponseFields> when the check passes.
 *
 * @param response The response to check
 * @returns True if the body is an IResponseFields object, false otherwise
 */
export function isWithIsSuccess(
  response: IResponse<unknown>
): response is IResponse<IResponseFields> {
  return (
    typeof response.body === 'object' &&
    response.body !== null &&
    response.body['IsSuccess'] !== undefined &&
    response.body['ErrorMessage'] !== undefined
  );
}
