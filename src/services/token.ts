import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IToken } from "../types/token";
import { ILoginData, IRegistrationData } from "../types/user";

const ENDPOINT = `${process.env.BACKEND_URL}/api`;

export const tokenApi = createApi({
  reducerPath: "tokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IToken, ILoginData>({
      query: (credentials: ILoginData) => {
        return {
          url: "/login",
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
