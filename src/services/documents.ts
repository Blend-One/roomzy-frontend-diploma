import { createApi } from "@reduxjs/toolkit/query/react";
import baseAppQuery from "./tools/baseAppQuery";
import { IDocument } from "../types/documents";

const ENDPOINT = `/documents`;

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: baseAppQuery,
  endpoints: (builder) => ({
    getDocumentByRentId: builder.query<IDocument, { rentId: string }>({
      query: (data) => {
        return {
          url: `${ENDPOINT}/${data.rentId}`,
          method: "GET",
        };
      },
    }),
    downloadDocumentById: builder.mutation<Blob, { documentId: string }>({
      query: (data) => {
        return {
          url: `${ENDPOINT}/pdf/${data.documentId}`,
          method: "GET",
          responseHandler: async (response) => response.blob(),
        };
      },
    }),
    postDocument: builder.mutation<void, { documentId: string; cms: string }>({
      query: (data) => {
        return {
          url: `${ENDPOINT}/sign/${data.documentId}`,
          method: "POST",
          body: {
            cms: data.cms,
          },
        };
      },
    }),
  }),
});

export const {
  useGetDocumentByRentIdQuery,
  useDownloadDocumentByIdMutation,
  usePostDocumentMutation,
} = documentsApi;

export default documentsApi;
