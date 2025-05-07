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
          url: `${ENDPOINT}/${id}`,
          method: "GET",
        };
      },
      transformResponse: () => testRentView,
    }),
  }),
});

const testRentView: IViewRent = {
  id: "342e0b5e-ed83-420c-9c3c-858378608ddf",
  roomId: "1d170ac8-d78f-4115-a5e3-8562b4d009fd",
  userId: "71930311-aae2-47a6-b1a7-a62d6e9869c8",
  rentStatus: "OPENED",
  issuedDate: "2025-05-10T05:00:00.000Z",
  dueDate: "2025-05-10T15:00:00.000Z",
  totalPrice: "0",
  paymentDate: null,
  room: {
    price: "180000",
    priceUnit: "PER_HOUR",
    hasDeposit: false,
    status: "OPENED",
    title: "Особняк",
  },
  user: {
    id: "71930311-aae2-47a6-b1a7-a62d6e9869c8",
    email: "kaziev.daniel@gmail.com",
    firstName: null,
    secondName: null,
  },
};

export const {
  useCreateRentMutation,
  useGetPersonalRentsListQuery,
  useGetRentsListByIdQuery,
  useGetRentByIdQuery,
} = rentApi;

export default rentApi;
