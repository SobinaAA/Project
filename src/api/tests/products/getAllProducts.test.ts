import _ from "lodash";
import { STATUS_CODES } from "../../../data/statusCodes";
import { test, expect } from "../../../fixtures/apiServices.fixture";

import { sortField, sortDir, sortsASCDESC, sortsField } from "../../../data/types/requestParams";
import { validateJsonSchema, validateResponse } from "../../services/validation/apiValidation";
import { allProductsResponseSchema } from "../../../data/jsonSchemas/product.schema";
import { IResponse } from "../../../data/types/api.types";

test.describe("[API] [Products] [Sorting and filtering list of the Products]", async function () {

  test("[1P-API] GET the complete list of products without sorting and filtering ", async function ({
    signInApiService,
    productsAPIController
  }) {
    const token = await signInApiService.loginAsAdmin();
    const response = await productsAPIController.getAll(token);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(allProductsResponseSchema, response);
  });

for (const keyField in sortField) {
    for (const keyDir in sortDir) {
      console.log('________________' , keyField, keyDir)
      test(`Should get products sorted by ${keyField} in ${keyDir} order`, async function ({
        signInApiService,
        productsAPIController
      }) {
        const token = await signInApiService.loginAsAdmin();
        const response = await productsAPIController.getAll(token, {
          sortField: keyField,
          sortOrder: keyDir as sortsASCDESC,
        });
        validateResponse(response, STATUS_CODES.OK, true, null);
        validateJsonSchema(allProductsResponseSchema, response);
        const sortedResponse = await productsAPIController.sorting(response.body.Products, keyField as sortsField, keyDir as sortsASCDESC);
        expect(sortedResponse.every((p, i) => p[keyField as keyof typeof sortField] === response.body.Products[i][keyField as keyof typeof sortField])).toBe(true);        
      });

  }};
})