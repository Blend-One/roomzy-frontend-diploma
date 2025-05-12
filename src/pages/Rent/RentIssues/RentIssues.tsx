import { useParams } from "react-router";
import Page from "../../../components/Page";
import { Button, Stack, TablePagination } from "@mui/material";
import NoData from "../../../components/NoData";
import { useMemo, useState } from "react";
import { useGetRentIssuesListQuery } from "../../../services/rentIssues";
import { getTableData } from "./getTableData";
import BasicTable from "../../../components/Table";
import { FormProvider, useForm } from "react-hook-form";
import FormContainer from "../../../components/Forms/FormContainer";

const RentIssues = () => {
  const { id } = useParams();
  const { data } = useGetRentIssuesListQuery({ rentId: id ?? "" });

  const formMethods = useForm({
    defaultValues: {
      fallbackName: "",
      ru: "",
      kz: "",
      sectionIds: [],
    },
  });

  const onSubmit = (data) => {
    data.fallbackName = data.ru;
    postTypes(data);
  };

  // const tableData = useMemo(() => {
  //   if (data?.length) {
  //     return getTableData(data);
  //   }
  //   return null;
  // }, [data]);

  // const [page, setPage] = useState(2);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (
  //   _event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  return (
    <Page withPadding>
      <FormProvider {...formMethods}>
        <FormContainer
          onSubmit={onSubmit}
          isLoading={isLoading}
          formId={"create-worker-form"}
        >
          <Typography variant="h5">Создание типа помещения</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom name={"ru"} label={"Название (RU)"} required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextFieldCustom name={"kz"} label={"Название (KZ)"} required />
            </Grid>
          </Grid>
        </FormContainer>
      </FormProvider>
      <Stack spacing={2} direction="column" flexGrow={1}>
        <Stack direction="row" p={2}>
          <Button>Добавить спорный момент</Button>
        </Stack>
        {/* <Stack flexGrow={1} spacing={2}>
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
      </Stack> */}
      </Stack>
    </Page>
  );
};

export default RentIssues;
