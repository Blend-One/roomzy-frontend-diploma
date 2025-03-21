import { jwtDecode } from "jwt-decode";
import { ITokenData } from "../../../types/token";

export const getTokenData = (token: string): ITokenData | null => {
  const data = jwtDecode<ITokenData>(token);
  if (!data) return null;
  return data;
};
