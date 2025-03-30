import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IBaseSearchParams } from "../types/pagination";
import { IRoomTypes } from "../types/roomTypes";

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
  }),
});

export const { useGetRoomTypesListQuery } = roomTypesApi;

export default roomTypesApi;
