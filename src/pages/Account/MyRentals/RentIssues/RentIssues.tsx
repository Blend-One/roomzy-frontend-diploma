import { Stack, TablePagination } from "@mui/material";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import NoData from "../../../../components/NoData";
import Page from "../../../../components/Page";
import BasicTable from "../../../../components/Table";
import { useGetRentIssuesListQuery } from "../../../../services/rentIssues";
import { getTableData } from "./getTableData";
import AccountWrapperWidget from "../../../../widgets/AccountWrapperWidget";

const RentIssues = () => {
  const { id } = useParams();
  const { data } = useGetRentIssuesListQuery({ rentId: id ?? "" });

  const tableData = useMemo(() => {
    if (data?.length) {
      return getTableData(data);
    }
    return null;
  }, [data]);

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

export default RentIssues;
