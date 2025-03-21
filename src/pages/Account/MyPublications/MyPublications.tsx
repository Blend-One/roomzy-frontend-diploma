import Page from "../../../components/Page";
import AccountWrapperWidget from "../../../widgets/AccountWrapperWidget";
import BasicTable from "../../../components/Table";
import { Button, Stack, TablePagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useGetRoomPersonalQuery } from "../../../services/rooms";
import { getTableData } from "./getTableData";
import NoData from "../../../components/NoData";

const MyPublications = () => {
  const { t } = useTranslation("space");
  const navigate = useNavigate();
  const { data } = useGetRoomPersonalQuery({
    page: 1,
    limit: 100,
  });

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

  const handleCreatePublication = () => navigate("/publications/create");

  return (
    <Page withPadding>
      <AccountWrapperWidget>
        <Stack flexGrow={1} spacing={3}>
          <Stack direction="row" spacing={2}>
            <TextField size="small" sx={{ flexGrow: 1 }} label="Search" />
            <Button
              onClick={handleCreatePublication}
              startIcon={<AddIcon />}
              variant="contained"
            >
              {t("I18N_SPACE_CREATE_PUBLICATION")}
            </Button>
          </Stack>
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
      </AccountWrapperWidget>
    </Page>
  );
};

export default MyPublications;
