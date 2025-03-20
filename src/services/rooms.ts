import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IRoom, TRoomsSearchParams } from "../types/rooms";
import { spaceDetailsMock, spaceMock } from "./mock/space";

const ENDPOINT = `/rooms`;

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRoomsList: builder.query<IRoom[], TRoomsSearchParams>({
      query: (data: TRoomsSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    createRoom: builder.mutation<IRoom, FormData>({
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
    getSpaceById: builder.query<IRoom, string>({
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
  // useGetSpaceByIdQuery
} = roomsApi;

/* eslint-disable @typescript-eslint/no-unused-vars */

export const useGetSpaceByIdQuery = (_params: string) => {
  return {
    data: spaceMock,
    refetch: () => {},
  };
};

export const useGetSpaceDetailsByIdQuery = (_params: string) => {
  return {
    data: spaceDetailsMock,
    refetch: () => {},
  };
};

export default roomsApi;
