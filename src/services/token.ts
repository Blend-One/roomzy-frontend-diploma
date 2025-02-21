import { createApi } from "@reduxjs/toolkit/query/react";
import { IToken } from "../types/token";
import { ILoginData, IRegistrationData } from "../types/user";
import { baseAppQuery } from "./baseAppQuery";

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
    logout: builder.mutation<undefined, undefined>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation<IToken, undefined>({
      query: () => ({
        url: "/refresh",
        method: "POST",
        body: {
          refreshToken: localStorage.getItem("refreshToken") ?? "",
        },
      }),
    }),
    registration: builder.mutation<IToken, IRegistrationData>({
      query: (userData: IRegistrationData) => {
        return {
          url: "/registration",
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
