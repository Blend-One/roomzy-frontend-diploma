import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IBaseSearchParams, IPaginatedList } from "../types/pagination";
import { ICreateRoomTypes, IRoomTypes } from "../types/roomTypes";
import transformPagination from "./tools/transformPagination";

const ENDPOINT = `/room_types`;

const roomTypesApi = createApi({
  reducerPath: "roomTypesApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRoomTypesList: builder.query<
      IPaginatedList<IRoomTypes>,
      IBaseSearchParams
    >({
      query: (data: IBaseSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}?${queryParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: transformPagination,
    }),
    getRoomTypesById: builder.query<ICreateRoomTypes, string>({
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
    updateRoomTypes: builder.mutation<
      IRoomTypes,
      { id: string; data: ICreateRoomTypes }
    >({
      query: ({ id, data }) => {
        return {
          url: `${ENDPOINT}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetRoomTypesListQuery,
  useCreateRoomTypesMutation,
  useUpdateRoomTypesMutation,
  useGetRoomTypesByIdQuery,
} = roomTypesApi;

export default roomTypesApi;
