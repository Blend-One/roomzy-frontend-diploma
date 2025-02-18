import { IUserData } from "./user";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IBaseTokenData {
  iss: string;
  exp: number;
}

export interface ITokenData extends IBaseTokenData, IUserData {}
