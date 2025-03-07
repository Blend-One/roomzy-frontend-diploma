import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IPaginatedList } from "../types/pagination";
import { ISpace, TSpacesSearchParams } from "../types/space";
import { spaceListMock } from "./mock/space";

const ENDPOINT = `/space`;

export const spaceApi = createApi({
  reducerPath: "spaceApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getSpacesList: builder.query<IPaginatedList<ISpace>, TSpacesSearchParams>({
      query: (data: TSpacesSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}/spaces?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

// export const { useGetSpacesListQuery } = spaceApi;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useGetSpacesListQuery = (
  _data: TSpacesSearchParams
): IPaginatedList<ISpace> => {
  return {
    pages: 1,
    data: spaceListMock,
  };
};

export default spaceApi;
