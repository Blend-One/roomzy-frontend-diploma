import Page from "../../../components/Page";
import AccountWrapperWidget from "../../../widgets/AccountWrapperWidget";
import BasicTable from "../../../components/Table";
import { Button, Stack, TablePagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getTableData } from "./getTableData";
import NoData from "../../../components/NoData";
import { useGetRoomTypesListQuery } from "../../../services/roomTypes";

const RoomTypes = () => {
  const { t } = useTranslation("account");
  const navigate = useNavigate();
  const { data } = useGetRoomTypesListQuery({
    page: 1,
    limit: 100,
  });

  const tableData = useMemo(() => {
    if (data?.data.length) {
      return getTableData(data.data, navigate);
    }
    return null;
  }, [data, navigate]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreatePublication = () => navigate("/account/room-types/create");

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
              {t("I18N_CREATE_ROOM_TYPES")}
            </Button>
          </Stack>
          <Stack flexGrow={1} spacing={2}>
            {!tableData && <NoData />}
            {tableData && data && (
              <>
                <BasicTable data={tableData} />
                <TablePagination
                  component="div"
                  count={data.totalCount + 1}
                  page={page - 1}
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

export default RoomTypes;
