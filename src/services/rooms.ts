import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { ICreateRoom, IViewRoom, TRoomsSearchParams } from "../types/rooms";
import { IBaseSearchParams } from "../types/pagination";

const ENDPOINT = `/rooms`;

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRoomsList: builder.query<ICreateRoom[], TRoomsSearchParams>({
      query: (data: TRoomsSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getRoomPersonal: builder.query<IViewRoom[], IBaseSearchParams>({
      query: (data: TRoomsSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}/personal?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    createRoom: builder.mutation<ICreateRoom, FormData>({
      query: (data: FormData) => {
        return {
          url: `${ENDPOINT}`,
          method: "POST",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          body: data,
        };
      },
    }),
    getRoomById: builder.query<IViewRoom, string>({
      query: (id: string) => {
        return {
          url: `${ENDPOINT}/spaces/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetRoomsListQuery,
  useCreateRoomMutation,
  useGetRoomByIdQuery,
  useGetRoomPersonalQuery,
} = roomsApi;

export default roomsApi;
