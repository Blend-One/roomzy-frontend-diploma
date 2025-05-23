import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IModerationsIssues, IRentIssues } from "../types/rentIssues";

const ENDPOINT = `/controversial_issues`;

export const rentIssues = createApi({
  reducerPath: "rentIssues",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRentIssuesList: builder.query<IRentIssues[], { rentId: string }>({
      query: (data) => {
        return {
          url: `${ENDPOINT}/rooms/${data.rentId}`,
          method: "GET",
        };
      },
    }),
    getRentIssuesByRoomIdList: builder.query<IRentIssues[], { rentId: string }>(
      {
        query: (data) => {
          return {
            url: `${ENDPOINT}/rents/${data.rentId}`,
            method: "GET",
          };
        },
      },
    ),
    postIssues: builder.mutation<IRentIssues[], { data: FormData; id: string }>(
      {
        query: (data) => {
          return {
            url: `${ENDPOINT}/${data.id}`,
            method: "POST",
            body: data.data,
          };
        },
      },
    ),
    getModerations: builder.query<IModerationsIssues[], void>({
      query: () => {
        return {
          url: `${ENDPOINT}/moderation?page=1&limit=100`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetRentIssuesListQuery,
  useGetRentIssuesByRoomIdListQuery,
  usePostIssuesMutation,
  useGetModerationsQuery,
} = rentIssues;

export default rentIssues;
