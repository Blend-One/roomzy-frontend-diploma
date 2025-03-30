import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { INameSearchParams } from "../types/pagination";
import { ISectionTypes } from "../types/sectionTypes";

const ENDPOINT = `/attributes`;

export const attributesApi = createApi({
  reducerPath: "attributesApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getAttributesList: builder.query<ISectionTypes[], INameSearchParams>({
      query: (data: INameSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAttributesListQuery } = attributesApi;

export default attributesApi;
