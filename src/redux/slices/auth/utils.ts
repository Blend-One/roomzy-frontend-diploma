import { ITokenData } from "@/types/token";
import { jwtDecode } from "jwt-decode";

export const getTokenData = (token: string): ITokenData | null => {
  const data = jwtDecode<ITokenData>(token);
  if (data == null) return null;
  return data;
};
