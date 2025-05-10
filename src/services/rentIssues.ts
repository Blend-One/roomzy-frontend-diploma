import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IRentIssues } from "../types/rentIssues";

const ENDPOINT = `/controversial_issues`;

export const rentIssues = createApi({
  reducerPath: "rentIssues",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getRentIssuesList: builder.query<IRentIssues[], { rentId: string }>({
      query: (data) => {
        return {
          url: `${ENDPOINT}/rents/${data.rentId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetRentIssuesListQuery } = rentIssues;

export default rentIssues;
