import { IUserData } from "./user";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IBaseTokenData {
  iat: number;
  exp: number;
  jwtid: string;
}

export interface ITokenData extends IBaseTokenData, IUserData {}
