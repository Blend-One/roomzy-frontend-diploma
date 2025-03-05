import { ChangeEvent } from "react";
export interface IPaginatedList<T> {
  pages: number;
  data: Array<T>;
}

export type TPaginationData = {
  pageNo: number;
  pageSize: number;
  pages: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export interface IBaseSearchParams {
  pageNo?: number;
  pageSize?: number;
  search?: string;
  searchBy?: string;
  orderBy?: string;
  order?: string;
}
