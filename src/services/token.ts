import { createApi } from "@reduxjs/toolkit/query/react";
import { IToken } from "../types/token";
import { ILoginData, IRegistrationData } from "../types/user";
import { baseAuthQuery } from "./tools/baseAppQuery";

const ENDPOINT = `/users`;

export const tokenApi = createApi({
  reducerPath: "tokenApi",
  baseQuery: baseAuthQuery,
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
    logout: builder.mutation<undefined, undefined>({
      query: () => ({
        url: `${ENDPOINT}/logout`,
        method: "POST",
      }),
    }),
    refresh: builder.mutation<IToken, undefined>({
      query: () => ({
        url: `${ENDPOINT}/refresh`,
        method: "POST",
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
