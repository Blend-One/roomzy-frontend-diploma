import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { ICreateRent, ICreateRentResponse, IViewRent } from "../types/rent";
import { IBaseSearchParams } from "../types/pagination";

const ENDPOINT = `/rents`;

export const rentApi = createApi({
  reducerPath: "rentApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    createRent: builder.mutation<ICreateRentResponse, ICreateRent>({
      query: (data: ICreateRent) => {
        return {
          url: `${ENDPOINT}`,
          method: "POST",
          body: data,
        };
      },
    }),
    getPersonalRentsList: builder.query<IViewRent[], IBaseSearchParams>({
      query: (data: IBaseSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}/personal?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateRentMutation, useGetPersonalRentsListQuery } = rentApi;

export default rentApi;
