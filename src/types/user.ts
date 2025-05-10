import { ITokenData } from "./token";

export type TUserRoles = "ADMIN" | "USER";

export interface IUser {
  firstName: string;
  lastName: string;
  avatarImageUrl: null;
  email: string;
  phone: string;
  status: string;
}

export interface IUserData extends IUser {
  id: string;
  role: TUserRoles;
}

export interface IAuthState {
  isAuthenticated: boolean;
  isRefreshing: boolean;
  redirectPath: string | null;
  data: ITokenData | null;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData {
  email: string;
  password: string;
}
