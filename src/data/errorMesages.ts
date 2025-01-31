export const ERRORS = {
  NOT_AUTHORIZED: 'Not authorized',
  INCORRECT_REQUEST_BODY: 'Incorrect request body',
  PRODUCT_NOT_FOUND: (id: string) => `Product with id ${id} wasn't found`
} as const;
