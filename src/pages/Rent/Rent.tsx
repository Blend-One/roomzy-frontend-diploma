import { Button, Grid2, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import { useNavigate, useParams } from "react-router";
import { useGetRoomByIdQuery } from "../../services/rooms";
import RoomCard from "../../components/Room/RoomCard";
import NotFound from "../Services/NotFound/NotFound";
import DateRangeCustom from "../../components/Forms/Inputs/DateRangeCustom";
import { FormProvider, useForm } from "react-hook-form";
import { ICreateRent } from "../../types/rent";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getPriceCurrency, getPriceUnit } from "../../utils/common";
import ViewMap from "../../components/Map/ViewMap";
import TimeRangeCustom from "../../components/Forms/Inputs/TimeRangeCustom";
import { useCreateRentMutation } from "../../services/rent";

const Rent = () => {
  const { id } = useParams();
  const { data, isError } = useGetRoomByIdQuery(id ?? "");
  const [price, setPrice] = useState<number>(0);
  const [dateCount, setDateCount] = useState<number>(0);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [postRent, { isSuccess }] = useCreateRentMutation();
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: {
      dateFrom: null,
      dateTo: null,
      timeFrom: null,
      numberHours: "",
      id: id ?? "",
    },
  });

  const { handleSubmit, watch } = formMethods;
  const dateFrom = watch("dateFrom");
  const dateTo = watch("dateTo");
  const timeFrom = watch("timeFrom");
  const numberHours = watch("numberHours");

  const onSubmit = async (formData: {
    id: string;
    dateFrom: string | null;
    dateTo: string | null;
  }) => {
    if (id && data) {
      let rentData: ICreateRent;

      if (data.priceUnit === "PER_DAY") {
        rentData = {
          roomId: id,
          issuedDate: dayjs(formData.dateFrom).toISOString(),
          dueDate: dayjs(formData.dateTo).toISOString(),
        };
        postRent(rentData);
      }
      if (data.priceUnit === "PER_MONTH") {
        const fromDate = dayjs(dateFrom).startOf("day");
        const toDate = dayjs(dateTo).startOf("day");
        const countGet = toDate.diff(fromDate, "month") + 1;
        const startDate = dayjs(dateFrom).toISOString();
        const endDate = dayjs(dateFrom).add(countGet, "month").toISOString();

        rentData = {
          roomId: id,
          issuedDate: startDate,
          dueDate: endDate,
        };
        postRent(rentData);
      }
      if (data.priceUnit === "PER_HOUR") {
        const fromDate = dayjs(dateFrom)
          .set("hour", dayjs(timeFrom).get("hour"))
          .startOf("hour");
        const toDate = fromDate.add(+numberHours, "hour").startOf("hour");

        rentData = {
          roomId: id,
          issuedDate: fromDate.toISOString(),
          dueDate: toDate.toISOString(),
        };
        postRent(rentData);
      }
    }
  };

  useEffect(() => {
    if (dateFrom && dateTo && data) {
      if (data.priceUnit === "PER_DAY") {
        const fromDate = dayjs(dateFrom).startOf("day");
        const toDate = dayjs(dateTo).startOf("day");
        const pricePerDay = (toDate.diff(fromDate, "day") + 1) * +data.price;
        setPrice(pricePerDay);
        setDateCount(toDate.diff(fromDate, "day") + 1);
      }
      if (data.priceUnit === "PER_MONTH") {
        const fromDate = dayjs(dateFrom).startOf("day");
        const toDate = dayjs(dateTo).startOf("day");
        const countGet = toDate.diff(fromDate, "month") + 1;
        const pricePerDay = countGet * +data.price;

        const startDate = dayjs(dateFrom).format("DD.MM.YYYY");
        const endDate = dayjs(dateFrom)
          .add(countGet, "month")
          .format("DD.MM.YYYY");

        setPrice(pricePerDay);
        setDateCount(countGet);

        setAdditionalInfo(
          `Аренда начнётся с ${startDate} и закончится ${endDate}!`
        );
        return;
      }
      setAdditionalInfo("");
    }
    if (dateFrom && timeFrom && numberHours && data) {
      if (data.priceUnit === "PER_HOUR") {
        const fromDate = dayjs(dateFrom)
          .set("hour", dayjs(timeFrom).get("hour"))
          .startOf("hour");
        const toDate = fromDate.add(+numberHours, "hour").startOf("hour");

        const pricePerHour = toDate.diff(fromDate, "hour") * +data.price;

        setPrice(pricePerHour);
        setDateCount(toDate.diff(fromDate, "hour"));

        setAdditionalInfo(
          `Аренда начнётся с ${fromDate.format(
            "DD.MM.YYYY HH:mm"
          )} и закончится ${toDate.format("DD.MM.YYYY HH:mm")}`
        );
      }
    }
  }, [data, dateFrom, dateTo, formMethods, numberHours, timeFrom]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/account/rentals");
    }
  }, [isSuccess, navigate]);

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
                {data.priceUnit === "PER_HOUR" && <TimeRangeCustom />}
                {data.priceUnit === "PER_DAY" && <DateRangeCustom />}
                {data.priceUnit === "PER_MONTH" && <DateRangeCustom />}
                {additionalInfo && (
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
                      {additionalInfo}
                    </Stack>
                  </Stack>
                )}
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
                    Количество: {dateCount}{" "}
                    {getPriceUnit(data.priceUnit, dateCount)}
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
                  Забронировать
                </Button>
              </FormProvider>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <ViewMap height="400px" coords={[data.lat, data.lon]} />
            </Grid2>
          </Grid2>
        </Stack>
      )}
    </Page>
  );
};

export default Rent;
