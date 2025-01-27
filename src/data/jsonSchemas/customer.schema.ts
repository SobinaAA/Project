import { COUNTRIES } from "../customers/countries";
import { baseSchemaPart } from "./base.schema";

export const customerResponseSchema = {
  type: "object",
  properties: {
    Customer: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        email: {
          type: "string",
        },
        name: {
          type: "string",
        },
        city: {
          type: "string",
        },
        house: {
            type: "number",
        },
        flat: {
            type: "number",
        },
        street: {
            type: "string",
        },
        phone: {
            type: "string",
        },
        country: {
          type: "string",
          enum: Object.values(COUNTRIES),
        },
        createdOn: {
          type: "string",
        },
        notes: {
          type: "string",
        },
      },
      required: ["_id", "email", "name", "country", "street", "city", "createdOn", "house", "flat", "phone"],
      additionalProperties: false,
    },
    ...baseSchemaPart,
  },
};