import { IResponseFields } from 'data/types/api.types';

export interface IUserCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse extends IResponseFields {}
