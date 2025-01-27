import { apiConfig } from "../../config/apiConfig";
import { IProduct, IProductFromResponse, IProductResponse, IProductsResponse } from "../../data/types/product.types";
import { IRequestOptions } from "../../data/types/api.types";
import { IProductRequestParams, sortsASCDESC, sortsField } from "../../data/types/requestParams";
import { convertRequestParams } from "../../utils/request";
import { RequestApi } from "../apiClient/request";

export class ProductsController {
  constructor(private request = new RequestApi()) {}

  //@logStep("Create Product via API")
  async create(productData: IProduct, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.endpoints.Products,
      baseURL: apiConfig.baseUrl,
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: productData,
    };
    return await this.request.send<IProductResponse>(options);
  }


  async getAll(token: string, params?: IProductRequestParams) {
    let urlParams = "";
    if (params) {
      urlParams = convertRequestParams(params as Record<string, string>);
    }
    const options: IRequestOptions = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      url: apiConfig.endpoints.Products + urlParams,
      baseURL: apiConfig.baseUrl,
    };
    const result = await this.request.send<IProductsResponse>(options);
    return result;
  }

  async sorting(arr : IProductFromResponse[], field : sortsField, dir: sortsASCDESC) {
    let mySortedTable: IProductFromResponse[];
        switch (field) {
          case "name":
            mySortedTable = dir === "asc"? arr.sort((prod1, prod2) => prod1['name'].localeCompare(prod2['name'])): arr.sort((prod1, prod2) => prod2['name'].localeCompare(prod1['name']))
            break;
          case "price":
            mySortedTable = dir === "asc"? arr.sort((prod1, prod2) => +prod1['price'] - +prod2['price']): arr.sort((prod1, prod2) => +prod2['price'] - +prod1['price']);
            break;
          case "createdOn":
            mySortedTable = dir === "asc"? arr.sort((prod1, prod2) => Date.parse(prod1['createdOn']) - Date.parse(prod2['createdOn'])): arr.sort((prod1, prod2) => Date.parse(prod2['createdOn']) - Date.parse(prod1['createdOn']));
            break;
          default:
            throw new Error("Другие методы пока не реализованы!")
        }
        return mySortedTable;
      }

  async delete(productId: string, token: string) {
    const options: IRequestOptions = {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      url: apiConfig.endpoints["Get Product By Id"](productId),
    };
    return await this.request.send(options);
  }
}
