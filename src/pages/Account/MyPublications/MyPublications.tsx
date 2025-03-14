import Page from "../../../components/Page";
import AccountWrapperWidget from "../../../widgets/AccountWrapperWidget";
import BasicTable from "../../../components/Table";
import { Button, Stack, TablePagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { mockTableData } from "../../../components/Table/types";

const MyPublications = () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <TextField size="small" sx={{ flexGrow: 1 }} label="Search" />
            <Button startIcon={<SearchIcon />} variant="contained">
              Search
            </Button>
            <Button startIcon={<AddIcon />} variant="contained">
              Create Publication
            </Button>
          </Stack>
          <BasicTable data={mockTableData} />
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </AccountWrapperWidget>
    </Page>
  );
};

export default MyPublications;
