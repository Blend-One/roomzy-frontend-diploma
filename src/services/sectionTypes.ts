import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IBaseSearchParams } from "../types/pagination";

const ENDPOINT = `/section_types`;

export const sectionTypesApi = createApi({
  reducerPath: "sectionTypesApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getsectionTypesList: builder.query<unknown, IBaseSearchParams>({
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

export const { useGetsectionTypesListQuery } = sectionTypesApi;

export default sectionTypesApi;
