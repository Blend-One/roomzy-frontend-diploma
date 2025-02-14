import { ITokenData } from "./token";

export interface IUser {
  firstName: string;
  lastName: string;
}

export interface IUserData extends IUser {
  id: string;
  role: string;
  permissions: string[];
}

export interface IAuthState {
  isAuthenticated: boolean;
  data: ITokenData | null;
}

export interface ILoginData {
  phone: string;
  password: string;
}

export interface IRegistrationData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}
