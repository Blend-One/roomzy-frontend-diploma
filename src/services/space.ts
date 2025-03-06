import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IPaginatedList } from "../types/pagination";
import { ISpace, IViewSpace, TSpacesSearchParams } from "../types/space";
import { spaceDetailsMock, spaceListMock, spaceMock } from "./mock/space";

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
    getSpaceById: builder.query<IViewSpace, string>({
      query: (id: string) => {
        return {
          url: `${ENDPOINT}/spaces/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

// export const { useGetSpacesListQuery, useGetSpaceByIdQuery } = spaceApi;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useGetSpacesListQuery = (
  _data: TSpacesSearchParams
): IPaginatedList<ISpace> => {
  return {
    pages: 1,
    data: spaceListMock,
  };
};

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
