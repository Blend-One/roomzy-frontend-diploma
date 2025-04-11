import { useNavigate, useParams } from "react-router";
import Page from "../../components/Page";
import {
  Button,
  // Chip,
  Grid2 as Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ImgGallery from "../../components/ImgGallery";
import { FC, useEffect } from "react";
import { RoomSection } from "../../types/rooms";
import { useTranslation } from "react-i18next";
import { getRentTypeCompare, getRoomStatusCompare } from "../../utils/compare";
import ViewMap from "../../components/Map/ViewMap";
import {
  useGetRoomByIdQuery,
  useUpdateRoomStatusMutation,
} from "../../services/rooms";
import { getRoomImageLink } from "../../utils/images";
import AppConfig from "../../config";
import useHasRole from "../../hooks/useHasRole";

const PublicationTitle = styled(Paper)(({ theme }) => ({
  fontSize: "1.5rem",
  padding: theme.spacing(2),
}));

const DetailsComponent: FC<{ data: RoomSection }> = ({ data }) => {
  return (
    <>
      <Grid size={{ sm: 3 }}>
        <Paper elevation={5} sx={{ padding: 2 }}>
          {data.floorNumber} этаж
        </Paper>
      </Grid>
      <Grid size={{ sm: 9 }}>
        <Paper elevation={5} sx={{ padding: 5 }}>
          <Stack spacing={2}>
            {/* {data.data.map((dit, index) => (
              <Stack key={index}>
                <Stack>{dit.name}</Stack>
                <Stack direction="row">
                  {dit.details.map((tye) => (
                    <Chip sx={{ mt: 1, mr: 1 }} key={tye.id} label={tye.name} />
                  ))}
                </Stack>
              </Stack>
            ))} */}
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

const Publication = () => {
  const { id } = useParams();
  const { data, isError } = useGetRoomByIdQuery(id ?? "");
  const { t } = useTranslation(["space", "components"]);
  const nanigate = useNavigate();
  const hasRole = useHasRole(AppConfig.ROLES.MANAGER);
  const [updateRoomStatus, { isSuccess }] = useUpdateRoomStatusMutation();
  const handleApprove = () =>
    updateRoomStatus({
      roomId: data?.id ?? "",
      status: AppConfig.ROOM_STATUS.OPENED,
    });
  const handleReject = () =>
    updateRoomStatus({
      roomId: data?.id ?? "",
      status: AppConfig.ROOM_STATUS.REJECTED,
    });
  const handleModeration = () =>
    updateRoomStatus({
      roomId: data?.id ?? "",
      status: AppConfig.ROOM_STATUS.IN_MODERATION,
    });

  const images = data?.roomImages.map((row) => ({
    original: getRoomImageLink(row.id),
    thumbnail: getRoomImageLink(row.id),
  }));

  useEffect(() => {
    if (isError) {
      nanigate("/account/publications");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      nanigate(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Page withPadding>
      <Stack spacing={3} mt={4}>
        <PublicationTitle elevation={2}>{data?.title}</PublicationTitle>
        <Grid container spacing={2}>
          <Grid size={{ sm: 8 }}>
            <ImgGallery images={images ?? []} />
          </Grid>
          <Grid size={{ sm: 4 }}>
            <Paper elevation={5} sx={{ padding: 4 }}>
              <Stack spacing={1}>
                <Typography>
                  {t("I18N_SPACE_PRICE", {
                    price: data?.price,
                    type: getRentTypeCompare(data?.priceUnit ?? ""),
                  })}
                </Typography>
                <Typography>
                  {t("I18N_SPACE_ADDRESS")}: {data?.street}, {data?.building}
                </Typography>
                <Typography>
                  {data?.isCommercial
                    ? t("I18N_SPACE_COMMERCE")
                    : t("I18N_SPACE_LIVING")}
                </Typography>
                <Typography>
                  Локация: {data?.city.name}, {data?.district.name}
                </Typography>
                <Typography>
                  {t("I18N_SPACE_SQUARE", { square: data?.square })}
                </Typography>
                {/* TODO: GET floors number */}
                {/* <Typography>
                  {t("I18N_SPACE_FLOORS", { floors: data?. })}
                </Typography> */}
                <Typography>Тип помещения: {data?.roomType.name}</Typography>
                <Typography>
                  {t("I18N_SPACE_NEED_DEPOSIT")}:{" "}
                  {data?.hasDeposit ? "Да" : "Нет"}
                </Typography>
                {data?.status !== AppConfig.ROOM_STATUS.OPENED && (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "orange",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      border: "2px solid",
                      padding: 1,
                    }}
                  >
                    {getRoomStatusCompare(data?.status ?? "")}
                  </Typography>
                )}
                {data?.status === AppConfig.ROOM_STATUS.OPENED && (
                  <Button variant="contained">{t("I18N_SPACE_RENT")}</Button>
                )}
                {data?.status === AppConfig.ROOM_STATUS.IN_MODERATION &&
                  hasRole && (
                    <Stack pt={2} direction={"row"} spacing={1}>
                      <Button
                        sx={{ flexGrow: 1 }}
                        variant="contained"
                        color="success"
                        onClick={handleApprove}
                      >
                        Одобрить
                      </Button>
                      <Button
                        sx={{ flexGrow: 1 }}
                        variant="outlined"
                        color="error"
                        onClick={handleReject}
                      >
                        Отклонить
                      </Button>
                    </Stack>
                  )}
                {(data?.status === AppConfig.ROOM_STATUS.OPENED ||
                  data?.status === AppConfig.ROOM_STATUS.REJECTED) &&
                  hasRole && (
                    <Stack pt={2} direction={"row"} spacing={1}>
                      <Button
                        sx={{ flexGrow: 1 }}
                        variant="outlined"
                        color="warning"
                        onClick={handleModeration}
                      >
                        В модерацию
                      </Button>
                    </Stack>
                  )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={5}>
          {data && <ViewMap coords={[Number(data.lat), Number(data.lon)]} />}
        </Paper>
        <Grid container spacing={2}>
          {data &&
            data.roomSections.map((row, index) => (
              <DetailsComponent key={index} data={row} />
            ))}
        </Grid>
      </Stack>
    </Page>
  );
};

export default Publication;
