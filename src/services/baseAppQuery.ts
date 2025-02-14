import { clearTokenState, writeToken } from "@/redux/slices/auth";
import { IToken } from "@/types/token";
import injectToken from "@/utils/injectToken";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const ENDPOINT = `${process.env.BACKEND_URL}/api`;

const baseAppQuery = fetchBaseQuery({
  baseUrl: ENDPOINT,
  prepareHeaders: injectToken,
});

const baseAppQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAppQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseAppQuery(
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
