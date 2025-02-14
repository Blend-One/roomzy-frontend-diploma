import { IUserData } from "./user";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IBaseTokenData {
  iss?: string;
  azp: string;
  exp: number;
  iat: number;
  sub: string;
}

export interface ITokenData extends IBaseTokenData, IUserData {}
