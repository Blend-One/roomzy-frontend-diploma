import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import {
  ICreateRoom,
  IUpdateRoomStatus,
  IViewRoom,
  TRoomsSearchParams,
} from "../types/rooms";
import { IBaseSearchParams } from "../types/pagination";

const ENDPOINT = `/rooms`;

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRoomsList: builder.query<IViewRoom[], TRoomsSearchParams>({
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
    getRoomModerations: builder.query<IViewRoom[], IBaseSearchParams>({
      query: (data: TRoomsSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}/moderation?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    updateRoomStatus: builder.mutation<void, IUpdateRoomStatus>({
      query: (data: IUpdateRoomStatus) => {
        return {
          url: `${ENDPOINT}/in_moderation_ad_status/${data.roomId}`,
          method: "PATCH",
          body: {
            status: data.status,
          },
        };
      },
    }),
    createRoom: builder.mutation<ICreateRoom, FormData>({
      query: (data: FormData) => {
        return {
          url: `${ENDPOINT}`,
          method: "POST",
          body: data,
        };
      },
    }),
    getRoomById: builder.query<IViewRoom, string>({
      query: (id: string) => {
        return {
          url: `${ENDPOINT}/${id}`,
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
  useGetRoomModerationsQuery,
  useUpdateRoomStatusMutation,
  useGetRoomPersonalQuery,
} = roomsApi;

export default roomsApi;
