import { IProductFromResponse, MANUFACTURERS } from "./product.types";

export interface IProductRequestParams {
  search?: string;
  manufacturer?: MANUFACTURERS | string | MANUFACTURERS[];
  sortField?: sortsField | string;
  sortOrder?: sortsASCDESC;
}

export const sortDir = {
  asc: "По возрастанию",
  desc: "По убыванию"
} as const;

export type sortsASCDESC = keyof typeof sortDir;
export type sortsField = keyof typeof sortField;

export const sortField : Partial<IProductFromResponse> = {
  name: "Наименование",
  price: 0,
  createdOn: "Дата создания",
  manufacturer: MANUFACTURERS.AMAZON
} as const;

