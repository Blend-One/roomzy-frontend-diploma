import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import {
  ICreateCheckoutResponse,
  ICreateRent,
  ICreateRentResponse,
  IUpdateRentStatus,
  IViewRent,
} from "../types/rent";
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
    getRentsListById: builder.query<IViewRent[], string>({
      query: (id: string) => {
        return {
          url: `${ENDPOINT}/${id}`,
          method: "GET",
        };
      },
    }),
    getRentById: builder.query<IViewRent, string>({
      query: (id: string) => {
        return {
          url: `${ENDPOINT}/single/${id}`,
          method: "GET",
        };
      },
    }),
    updateRentStatus: builder.mutation<ICreateRentResponse, IUpdateRentStatus>({
      query: (data: IUpdateRentStatus) => {
        return {
          url: `${ENDPOINT}/${data.role}/status/${data.id}`,
          method: "PATCH",
          body: {
            status: data.status,
          },
        };
      },
    }),
    getInstructions: builder.query<
      { instructions: string },
      { rentId: string; type: "access" | "phys_control" }
    >({
      query: (data: { rentId: string; type: "access" | "phys_control" }) => {
        return {
          url: `${ENDPOINT}/${data.rentId}/instructions/${data.type}`,
          method: "GET",
        };
      },
    }),
    createCheckout: builder.mutation<
      ICreateCheckoutResponse,
      { rentId: string }
    >({
      query: (data) => {
        return {
          url: `${ENDPOINT}/create_checkout/${data.rentId}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useCreateRentMutation,
  useGetPersonalRentsListQuery,
  useGetRentsListByIdQuery,
  useGetRentByIdQuery,
  useUpdateRentStatusMutation,
  useGetInstructionsQuery,
  useCreateCheckoutMutation,
} = rentApi;

export default rentApi;
