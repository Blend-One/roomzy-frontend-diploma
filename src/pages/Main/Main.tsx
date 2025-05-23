import { Button, Grid2 as Grid, Paper } from "@mui/material";
import Page from "../../components/Page";
import { useGetRoomsListQuery } from "../../services/rooms";
import RoomCard from "../../components/Room/RoomCard";
import NoData from "../../components/NoData";
import CitiesField from "../../components/Forms/Custom/CitiesField";
import { FormProvider, useForm } from "react-hook-form";
import DistrictsField from "../../components/Forms/Custom/DistrictsField";
import TextFieldCustom from "../../components/Forms/Inputs/TextFieldCustom";
import PriceField from "../../components/Forms/Custom/PriceField";
import PriceUnit from "../../components/Forms/Custom/PriceUnit";
import SquareField from "../../components/Forms/Custom/SquareField";
import HasSelect from "../../components/Forms/Custom/HasSelect";
import { useState } from "react";
import RoomTypes from "../../components/Forms/Custom/RoomTypes";

const Main = () => {
  const [params, setParams] = useState({});
  const { data, isLoading } = useGetRoomsListQuery(
    {
      page: 1,
      limit: 10,
      ...params,
    },
    { refetchOnMountOrArgChange: true },
  );

  const formMethods = useForm({
    defaultValues: {
      cityId: "",
      districtId: "",
      priceUnit: "",
      isCommercial: "",
      physControl: "",
      squareFrom: "",
      priceFrom: "",
      priceTo: "",
      squareTo: "",
      title: "",
      hasDeposit: "",
      roomTypeId: "",
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== ""),
    );
    const PAYLOAD: typeof data = {};
    if (filteredData.title) {
      PAYLOAD.title = filteredData.title;
    }
    if (filteredData.roomTypeId) {
      PAYLOAD.roomTypeId = filteredData.roomTypeId;
    }
    if (filteredData.cityId) {
      PAYLOAD.cityId = filteredData.cityId;
    }
    if (filteredData.districtId) {
      PAYLOAD.districtId = filteredData.districtId;
    }
    if (filteredData.priceFrom || filteredData.priceTo) {
      PAYLOAD.priceRange = JSON.stringify({
        min: filteredData.priceFrom ?? 0,
        max: filteredData.priceTo ?? 0,
      });
    }
    if (filteredData.squareFrom) {
      PAYLOAD.square = JSON.stringify({
        min: Number(filteredData.squareFrom),
      });
    }
    if (filteredData.squareTo) {
      PAYLOAD.square = JSON.stringify({
        max: Number(filteredData.squareTo),
      });
    }
    if (filteredData.squareFrom && filteredData.squareTo) {
      PAYLOAD.square = JSON.stringify({
        min: Number(filteredData.squareFrom),
        max: Number(filteredData.squareTo),
      });
    }
    if (filteredData.isCommercial === "YES") {
      PAYLOAD.isCommercial = "true";
    }
    if (filteredData.isCommercial === "NO") {
      PAYLOAD.isCommercial = "false";
    }
    if (filteredData.hasDeposit === "YES") {
      PAYLOAD.hasDeposit = "true";
    }
    if (filteredData.hasDeposit === "NO") {
      PAYLOAD.hasDeposit = "false";
    }
    if (filteredData.physControl === "YES") {
      PAYLOAD.physControl = "true";
    }
    if (filteredData.physControl === "NO") {
      PAYLOAD.physControl = "false";
    }
    if (filteredData.priceUnit) {
      PAYLOAD.priceUnit = filteredData.priceUnit;
    }
    setParams(PAYLOAD);
  };

  return (
    <Page withPadding>
      <Paper
        elevation={2}
        sx={(theme) => ({
          padding: theme.spacing(2),
          margin: theme.spacing(2, 0),
        })}
      >
        <FormProvider {...formMethods}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <TextFieldCustom name={"title"} label={"Название"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <CitiesField withEmpty required={false} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <DistrictsField withEmpty required={false} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <PriceField />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <PriceUnit withEmpty required={false} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <SquareField />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <HasSelect
                withEmpty
                label={"Разрешёно ли осмотр"}
                name={"physControl"}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <HasSelect
                withEmpty
                label={"Подходит для коммерции?"}
                name={"isCommercial"}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <HasSelect
                withEmpty
                label={"Нужен депозит?"}
                name={"hasDeposit"}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <RoomTypes withEmpty />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                loading={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? "Подождите..." : "Поиск"}
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Paper>
      {!data?.length && <NoData />}
      <Grid container spacing={2}>
        {data &&
          data.map((row) => (
            <Grid key={row.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <RoomCard data={row} />
            </Grid>
          ))}
      </Grid>
    </Page>
  );
};

export default Main;
