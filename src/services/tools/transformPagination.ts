import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import { IPaginatedList } from "../../types/pagination";

export default function paginatedResponse<T>(
  baseQueryReturnValue: Array<T>,
  meta: FetchBaseQueryMeta
): IPaginatedList<T> {
  return {
    totalCount: parseInt(
      meta.response?.headers.get("X-Total-Count") ?? "0",
      10
    ),
    data: baseQueryReturnValue,
  };
}
