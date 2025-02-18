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
    ['Order Delivery']: (id: string) => `api/orders/${id}/delivery/`,
    ['Order Receive']: (id: string) => `api/orders/${id}/receive`,
    ['Status Order By Id']: (id: string) => `api/orders/${id}/status`,
    ['Comment Order By Id']: (id: string) => `api/orders/${id}/comments`,
    ['Order Status']: (id: string) => `api/orders/${id}/status`,
    ['Order Delete']: (id: string) => `api/orders/${id}/`,
    ['Metrics']: `api/metrics`
  }
};
