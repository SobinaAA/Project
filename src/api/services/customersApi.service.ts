import { generateNewCustomer } from 'data/customers/generateCustomer';
import { STATUS_CODES } from 'data/statusCodes';
import { ICustomer } from 'data/types/customers.types';
import { CustomersAPIController } from 'api/controllers/customers.controller';
import { SignInApiService } from 'api/services/signInApi.service';
import { ICustomerRequestParams } from 'data/types/requestParams';
import {
  validateResponse,
  validateJsonSchema
} from 'utils/validation/apiValidation';
import { allCustomersResponseSchema } from 'data/jsonSchemas/customer.schema';
import { logStep } from 'utils/report/logStep';

export class CustomersApiService {
  constructor(
    private customersController = new CustomersAPIController(),
    private signInApiService = new SignInApiService()
  ) {}

  @logStep('Create Customer via API')
  async create(customerData?: Partial<ICustomer>) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.create(
      generateNewCustomer(customerData),
      token
    );
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Customer;
  }

  @logStep('Get All Customers via API')
  async getAll(params?: ICustomerRequestParams) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.getAll(token, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allCustomersResponseSchema, response);
    return response;
  }

  @logStep('Delete Customer via API')
  async delete(id: string) {
    const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.delete(id, token);
    validateResponse(response, STATUS_CODES.DELETED);
  }

  @logStep('Update Customer via API')
  async update(id: string, customerData?: Partial<ICustomer>) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.update({
      id,
      token,
      body: generateNewCustomer(customerData)
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Customer;
  }

  @logStep('Get Customer by ID via API')
  async getByID(id: string) {
    const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.getByID(id, token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Customer;
  }
}
