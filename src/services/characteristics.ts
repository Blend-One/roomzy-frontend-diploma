import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IBaseSearchParams } from "../types/pagination";
import { ISectionTypes } from "../types/sectionTypes";

const ENDPOINT = `/characteristics`;

export const characteristicsApi = createApi({
  reducerPath: "characteristicsApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getCharacteristicsList: builder.query<ISectionTypes[], IBaseSearchParams>({
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

export const { useGetCharacteristicsListQuery } = characteristicsApi;

export default characteristicsApi;
