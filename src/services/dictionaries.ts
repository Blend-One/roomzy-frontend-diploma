import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IPaginatedList, IBaseSearchParams } from "../types/pagination";
import { IDictionary, IDictionaryListWithId } from "../types/dictionaries";
import { dictionariesIdListMock } from "./mock/dictionaries";

const ENDPOINT = "/dictionaries";

export const dictionariesApi = createApi({
  reducerPath: "dictionariesApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getCitiesList: builder.query<IDictionary[], IBaseSearchParams>({
      query: (data: IBaseSearchParams) => {
        const queryParams = new URLSearchParams(Object.entries(data));
        return {
          url: `${ENDPOINT}/cities?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getDistrictsByCityIdList: builder.query<
      IDictionary[],
      IDictionaryListWithId
    >({
      query: ({ cityId, ...data }: IDictionaryListWithId) => {
        const queryParams = new URLSearchParams(
          Object.entries(data) as string[][]
        );
        return {
          url: `${ENDPOINT}/districts/${cityId}?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCitiesListQuery,
  useGetDistrictsByCityIdListQuery,
  // useGetDictionariesByIdListQuery
} = dictionariesApi;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useGetDictionariesByIdListQuery = (
  _data: IDictionaryListWithId
): IPaginatedList<IDictionary> => {
  return {
    pages: 1,
    data: dictionariesIdListMock,
  };
};

export default dictionariesApi;
