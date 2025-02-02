export interface IRequestOptions {
  baseURL?: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T> {
  status: number;
  body: T;
  headers: object;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}
