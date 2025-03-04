import { IAuthState } from "../../../types/user";
import { getTokenData } from "./utils";

const getInitialState = (): IAuthState => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const isAccessTokenExist = accessToken && accessToken !== "undefined";
  const isRefreshTokenExist = refreshToken && refreshToken !== "undefined";

  if (isAccessTokenExist && isRefreshTokenExist) {
    const tokenData = getTokenData(accessToken);

    return {
      isAuthenticated: true,
      redirectPath: null,
      data: tokenData,
    };
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return {
    isAuthenticated: false,
    redirectPath: null,
    data: null,
  };
};

export default getInitialState();
