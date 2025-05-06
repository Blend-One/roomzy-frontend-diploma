import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { ICreateRent, IViewRent } from "../types/rent";

const ENDPOINT = `/rents`;

export const rentApi = createApi({
  reducerPath: "rentApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    createRent: builder.mutation<IViewRent, ICreateRent>({
      query: (data: ICreateRent) => {
        return {
          url: `${ENDPOINT}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateRentMutation } = rentApi;

export default rentApi;
