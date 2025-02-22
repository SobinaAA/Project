export const ERRORS = {
  NOT_AUTHORIZED: 'Not authorized',
  INCORRECT_REQUEST_BODY: 'Incorrect request body',
  INCORRECT_CREDENTIALS: 'Incorrect credentials',
  LOGIN_ERROR: 'Login error',
  COMMENT_NOT_FOUND: 'Comment was not found',
  INVALID_FINAL_DATE: 'Invalid final date',
  INCORRECT_DELIVERY: 'Incorrect Delivery',
  PRODUCT_NOT_FOUND: (id: string) => `Product with id '${id}' wasn't found`,
  CUSTOMER_NOT_FOUND: (id: string) => `Customer with id '${id}' wasn't found`,
  ORDER_NOT_FOUND: (id: string) => `Order with id '${id}' wasn't found`,
  PRODUCT_CONFLICT: (name: string) =>
    `Product with name '${name}' already exists`
} as const;
