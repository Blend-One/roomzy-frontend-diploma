import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { injectAccessToken, injectRefreshToken } from "../utils/injectTokens";
import { clearTokenState, writeToken } from "../redux/slices/auth";
import { IToken } from "../types/token";

const ENDPOINT = `${import.meta.env.VITE_APP_BACKEND_URL}/api`;

export const baseAppQuery = fetchBaseQuery({
  baseUrl: ENDPOINT,
  prepareHeaders: injectAccessToken,
});

export const baseAuthQuery = fetchBaseQuery({
  baseUrl: ENDPOINT,
  prepareHeaders: (headers) => {
    injectAccessToken(headers);
    injectRefreshToken(headers);
  },
});

const baseAppQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAppQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseAuthQuery(
      {
        url: "/refresh",
        method: "POST",
        body: {
          refreshToken: localStorage.getItem("refreshToken") ?? "",
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as IToken;
      api.dispatch(writeToken(data));

      result = await baseAppQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearTokenState());
    }
  }
  return result;
};

export default baseAppQueryWithReauth;
