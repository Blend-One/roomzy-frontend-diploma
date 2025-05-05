import { Button, Grid2, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import { useParams } from "react-router";
import { useGetRoomByIdQuery } from "../../services/rooms";
import RoomCard from "../../components/Room/RoomCard";
import NotFound from "../Services/NotFound/NotFound";
import DateRangeCustom from "../../components/Forms/Inputs/DateRangeCustom";
import { FormProvider, useForm } from "react-hook-form";
import { ICreateRent } from "../../types/rent";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getPriceCurrency } from "../../utils/common";
import ViewMap from "../../components/Map/ViewMap";

const Rent = () => {
  const { id } = useParams();
  const { data, isError } = useGetRoomByIdQuery(id ?? "");
  const [price, setPrice] = useState<number>(0);
  const [dateCount, setDateCount] = useState<number>(0);

  const formMethods = useForm({
    defaultValues: {
      dateFrom: null,
      dateTo: null,
      id: id ?? "",
    },
  });

  const { handleSubmit, watch } = formMethods;
  const dateFrom = watch("dateFrom");
  const dateTo = watch("dateTo");

  const onSubmit = async (data: {
    id: string;
    dateFrom: string | null;
    dateTo: string | null;
  }) => {
    if (id) {
      const rentData: ICreateRent = {
        roomId: id,
        issuedDate: dayjs(data.dateFrom).toISOString(),
        dueDate: dayjs(data.dateTo).toISOString(),
      };
      console.log(rentData);
    }
  };

  useEffect(() => {
    if (dateFrom && dateTo && data) {
      const fromDate = dayjs(dateFrom).startOf("day");
      const toDate = dayjs(dateTo).startOf("day");
      const pricePerDay = (toDate.diff(fromDate, "day") + 1) * +data.price;
      setPrice(pricePerDay);
      setDateCount(toDate.diff(fromDate, "day") + 1);
    }
  }, [data, dateFrom, dateTo, formMethods]);

  if (isError) {
    return (
      <Page>
        <NotFound />
      </Page>
    );
  }
  return (
    <Page withPadding>
      {data && (
        <Stack spacing={3} mt={4} mb={6}>
          <Typography variant="h2" fontSize={"2rem"} fontWeight={400}>
            Аренда {data.title}
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <RoomCard onlyInfo data={data} />
            </Grid2>
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              size={{ xs: 12, sm: 6 }}
            >
              <FormProvider {...formMethods}>
                <DateRangeCustom />
                <Stack
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  mt={2}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    Цена: {getPriceCurrency(price)}
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    Количество: {dateCount}
                  </Stack>
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Перейти к оплате
                </Button>
              </FormProvider>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <ViewMap coords={[data.lat, data.lon]} />
            </Grid2>
          </Grid2>
        </Stack>
      )}
    </Page>
  );
};

export default Rent;
