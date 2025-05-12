import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  injectAccessToken,
  injectLanguage,
  injectRefreshToken,
} from "./injectTokens";
import { clearTokenState, writeToken } from "../../redux/slices/auth";
import { IToken } from "../../types/token";

const ENDPOINT = `${import.meta.env.VITE_APP_BACKEND_URL}/api`;

const baseAppQuery = fetchBaseQuery({
  baseUrl: ENDPOINT,
  prepareHeaders: (headers) => {
    injectAccessToken(headers);
    injectRefreshToken(headers);
    injectLanguage(headers);
  },
});

const baseAppQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAppQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const isRefreshing = api.getState() as { auth: { isRefreshing: boolean } };

    if (isRefreshing.auth.isRefreshing) {
      return result;
    }
    api.dispatch({ type: "auth/setIsRefreshing", payload: true });

    const refreshResult = await baseAppQuery(
      {
        url: "/users/refresh",
        method: "GET",
      },
      api,
      extraOptions
    );

    if (refreshResult.error && result.error.status === 401) {
      api.dispatch(clearTokenState());
      api.dispatch({ type: "auth/setIsRefreshing", payload: false });
      return refreshResult;
    }

    if (refreshResult.data) {
      const data = refreshResult.data as IToken;
      api.dispatch(writeToken(data));

      result = await baseAppQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearTokenState());
    }
    api.dispatch({ type: "auth/setIsRefreshing", payload: false });
  }
  return result;
};

export default baseAppQueryWithReauth;
