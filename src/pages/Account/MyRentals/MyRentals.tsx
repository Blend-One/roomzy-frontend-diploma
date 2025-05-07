import Page from "../../../components/Page";
import AccountWrapperWidget from "../../../widgets/AccountWrapperWidget";
import BasicTable from "../../../components/Table";
import { Stack, TablePagination } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getTableData } from "./getTableData";
import NoData from "../../../components/NoData";
import { useGetPersonalRentsListQuery } from "../../../services/rent";

const MyRentals = () => {
  const navigate = useNavigate();
  const { data } = useGetPersonalRentsListQuery({
    page: 1,
    limit: 100,
  });

  const tableData = useMemo(() => {
    if (data?.length) {
      return getTableData(data, navigate);
    }
    return null;
  }, [data, navigate]);

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page withPadding>
      <AccountWrapperWidget>
        <Stack flexGrow={1} spacing={3}>
          <Stack flexGrow={1} spacing={2}>
            {!tableData && <NoData />}
            {tableData && (
              <>
                <BasicTable data={tableData} />
                <TablePagination
                  component="div"
                  count={100}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Stack>
        </Stack>
      </AccountWrapperWidget>
    </Page>
  );
};

export default MyRentals;
