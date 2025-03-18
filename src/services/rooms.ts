import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IRoom, TRoomsSearchParams } from "../types/rooms";
import { spaceDetailsMock, spaceMock } from "./mock/space";

const ENDPOINT = `/rooms`;

export const spaceApi = createApi({
  reducerPath: "spaceApi",
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
  // useGetSpaceByIdQuery
} = spaceApi;

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

export default spaceApi;
