import { createApi } from "@reduxjs/toolkit/query/react";
import { IToken } from "../types/token";
import { ILoginData, IRegistrationData } from "../types/user";
import baseAppQuery from "./tools/baseAppQuery";

const ENDPOINT = `/users`;

export const tokenApi = createApi({
  reducerPath: "tokenApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    login: builder.mutation<IToken, ILoginData>({
      query: (credentials: ILoginData) => {
        return {
          url: `${ENDPOINT}/login`,
          method: "POST",
          body: credentials,
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${ENDPOINT}/logout`,
        method: "POST",
      }),
    }),
    refresh: builder.mutation<IToken, void>({
      query: () => ({
        url: `${ENDPOINT}/refresh`,
        method: "GET",
      }),
    }),
    registration: builder.mutation<IToken, IRegistrationData>({
      query: (userData: IRegistrationData) => {
        return {
          url: `${ENDPOINT}/registration`,
          method: "POST",
          body: userData,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegistrationMutation,
} = tokenApi;

export default tokenApi;
