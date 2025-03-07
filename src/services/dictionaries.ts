import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IPaginatedList, IBaseSearchParams } from "../types/pagination";
import { IDictionary, IDictionaryListWithId } from "../types/dictionaries";
import {
  dictionariesIdListMock,
  dictionariesListMock,
} from "./mock/dictionaries";

const ENDPOINT = `/dictionaries`;

export const dictionariesApi = createApi({
  reducerPath: "dictionariesApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getDictionariesList: builder.query<
      IPaginatedList<IDictionary>,
      IBaseSearchParams
    >({
      query: (data: IBaseSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getDictionariesByIdList: builder.query<
      IPaginatedList<IDictionary>,
      IDictionaryListWithId
    >({
      query: ({ dictionaryId, ...data }: IDictionaryListWithId) => {
        const queryParams = new URLSearchParams(
          Object.entries(data) as string[][]
        );
        return {
          url: `${ENDPOINT}/${dictionaryId}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

// export const { useGetDictionariesListQuery, useGetDictionariesByIdListQuery } = dictionariesApi;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useGetDictionariesListQuery = (
  _data: IBaseSearchParams
): IPaginatedList<IDictionary> => {
  return {
    pages: 1,
    data: dictionariesListMock,
  };
};
export const useGetDictionariesByIdListQuery = (
  _data: IDictionaryListWithId
): IPaginatedList<IDictionary> => {
  return {
    pages: 1,
    data: dictionariesIdListMock,
  };
};

export default dictionariesApi;
