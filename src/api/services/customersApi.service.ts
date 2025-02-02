import { expect } from '@playwright/test';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import { STATUS_CODES } from '../../data/statusCodes';
import { ICustomer } from '../../data/types/customers.types';
import { CustomersAPIController } from '../controllers/customers.controller';
import { SignInApiService } from './signInApi.service';
import { ICustomerRequestParams } from '../../data/types/requestParams';
import {
  validateResponse,
  validateJsonSchema
} from '../../utils/validation/apiValidation';
import { allCustomersResponseSchema } from '../../data/jsonSchemas/customer.schema';

export class CustomersApiService {
  constructor(
    private customersController = new CustomersAPIController(),
    private signInApiService = new SignInApiService()
  ) {}

  async create(customerData?: Partial<ICustomer>) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.create(
      generateNewCustomer(customerData),
      token
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    return response.body.Customer;
  }

  async getAll(params?: ICustomerRequestParams) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
    return response;
  }

  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  async update(id: string, customerData?: Partial<ICustomer>) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.update({
      id,
      token,
      body: generateNewCustomer(customerData)
    });
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    return response.body.Customer;
  }
}
