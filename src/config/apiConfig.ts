export const apiConfig = {
  baseUrl: 'https://aqa-course-project.app/',
  endpoints: {
    ['Login']: `api/login/`,
    ['Customers']: `api/customers/`,
    ['Get Customer By Id']: (id: string) => `api/customers/${id}/`,
    ['Products']: `/api/products/`,
    ['Get Product By Id']: (id: string) => `api/products/${id}/`,
    ['Orders']: `api/orders/`,
    ['Get Order By Id']: (id: string) => `api/orders/${id}/`,
    ['Order Delivery']: `api/orders/delivery/`,
    ['Order Receive']: `api/orders/receive/`,
    ['Status Delivery By Id']: (id: string) => `api/orders/${id}/delivery`,
    ['Status Order By Id']: (id: string) => `api/orders/${id}/status`,
    ['Comment Order By Id']: (id: string) => `api/orders/${id}/comments`,
    ['Order Status']: `api/orders/status`,
    ['Order Comments']: `api/orders/comments`,
    ['Metrics']: `api/metrics`
  }
};
