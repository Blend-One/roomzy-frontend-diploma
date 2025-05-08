import { Stack, TablePagination } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import NoData from "../../../../components/NoData";
import Page from "../../../../components/Page";
import BasicTable from "../../../../components/Table";
import {
  useGetRentsListByIdQuery,
  useUpdateRentStatusMutation,
} from "../../../../services/rent";
import AccountWrapperWidget from "../../../../widgets/AccountWrapperWidget";
import { getTableData } from "./getTableData";

const RentRequests = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data, refetch } = useGetRentsListByIdQuery(id ?? "");
  const [updateRentStatus, { isSuccess }] = useUpdateRentStatusMutation();

  const tableData = useMemo(() => {
    const handleApproveRent = async (id: string) => {
      await updateRentStatus({
        id,
        status: "IN_SIGNING_PROCESS",
        role: "landlord",
      });
    };
    const handleRejectRent = async (id: string) => {
      await updateRentStatus({ id, status: "REJECTED", role: "landlord" });
    };

    if (data?.length) {
      return getTableData(data, navigate, handleApproveRent, handleRejectRent);
    }
    return null;
  }, [data, navigate, updateRentStatus]);

  const [page, setPage] = useState(0);
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

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, navigate, refetch]);

  return (
    <Page withPadding>
      <AccountWrapperWidget>
        <Stack flexGrow={1} spacing={3}>
          {searchParams.get("roomName") && (
            <Stack direction="row" spacing={2}>
              <Stack flexGrow={1} sx={{ fontSize: "1.5rem" }}>
                Заявки арендаторов для {searchParams.get("roomName")}
              </Stack>
            </Stack>
          )}
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

export default RentRequests;
