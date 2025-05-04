import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IBaseSearchParams } from "../types/pagination";
import { ICreateRoomTypes, IRoomTypes } from "../types/roomTypes";

const ENDPOINT = `/room_types`;

const roomTypesApi = createApi({
  reducerPath: "roomTypesApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRoomTypesList: builder.query<IRoomTypes[], IBaseSearchParams>({
      query: (data: IBaseSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getRoomTypesById: builder.query<IRoomTypes, string>({
      query: (id: string) => {
        return {
          url: `${ENDPOINT}/${id}`,
          method: "GET",
        };
      },
    }),
    createRoomTypes: builder.mutation<IRoomTypes, ICreateRoomTypes>({
      query: (data: ICreateRoomTypes) => {
        return {
          url: `${ENDPOINT}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetRoomTypesListQuery, useCreateRoomTypesMutation } =
  roomTypesApi;

export default roomTypesApi;
