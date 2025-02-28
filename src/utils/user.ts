import { ITokenData } from "../types/token";

export const getUserFullNameOrEmail = (data: ITokenData): string => {
  const { firstName, lastName, email } = data;

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return email;
};
