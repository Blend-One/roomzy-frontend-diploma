import { ChangeEvent, useEffect, useState } from "react";
import { IPaginatedList } from "../types/pagination";


const usePagination = <T>(data: IPaginatedList<T>) => {
  
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [prevSize, setPrevSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setTotalPages(data?.pages || 1);
  }, [data?.pages]);

  useEffect(() => {
    if (itemsPerPage !== prevSize) {
      setPrevSize(itemsPerPage);
      setTotalPages(1);
    }
  }, [itemsPerPage, prevSize]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(+event.target.value);
    setTotalPages(1);
    setPageNumber(1);
  };

  return {
    pageNumber,
    itemsPerPage,
    totalPages,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default usePagination;
