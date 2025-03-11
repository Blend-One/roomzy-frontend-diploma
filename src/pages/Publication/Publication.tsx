import { useParams } from "react-router";
import Page from "../../components/Page";
import {
  useGetSpaceByIdQuery,
  useGetSpaceDetailsByIdQuery,
} from "../../services/space";
import {
  Button,
  Chip,
  Grid2 as Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ImgGallery from "../../components/ImgGallery";
import { FC, useMemo } from "react";
import { ISpaceDetails } from "../../types/space";
import { useTranslation } from "react-i18next";
import { getRentTypeCompare } from "../../utils/compare";
import ViewMap from "../../components/Map/ViewMap";

const PublicationTitle = styled(Paper)(({ theme }) => ({
  fontSize: "1.5rem",
  padding: theme.spacing(2),
}));

const DetailsComponent: FC<{ data: ISpaceDetails }> = ({ data }) => {
  return (
    <>
      <Grid size={{ sm: 3 }}>
        <Paper elevation={5} sx={{ padding: 2 }}>
          {data.floor} этаж
        </Paper>
      </Grid>
      <Grid size={{ sm: 9 }}>
        <Paper elevation={5} sx={{ padding: 5 }}>
          <Stack spacing={2}>
            {data.data.map((dit, index) => (
              <Stack key={index}>
                <Stack>{dit.name}</Stack>
                <Stack direction="row">
                  {dit.details.map((tye) => (
                    <Chip sx={{ mt: 1, mr: 1 }} key={tye.id} label={tye.name} />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

const Publication = () => {
  const { id } = useParams();
  const { data } = useGetSpaceByIdQuery(id ?? "");
  const { data: details } = useGetSpaceDetailsByIdQuery(data.id ?? "");
  const { t } = useTranslation(["space", "components"]);

  const images = useMemo(
    () =>
      data.images.map((row) => ({
        original: row,
        thumbnail: row,
      })),
    [data.images]
  );

  return (
    <Page withPadding>
      <Stack spacing={3} mt={4}>
        <PublicationTitle elevation={2}>{data.title}</PublicationTitle>
        <Grid container spacing={2}>
          <Grid size={{ sm: 8 }}>
            <ImgGallery images={images} />
          </Grid>
          <Grid size={{ sm: 4 }}>
            <Paper elevation={5} sx={{ padding: 4 }}>
              <Stack spacing={1}>
                <Typography>
                  {t("I18N_SPACE_PRICE", {
                    price: data.price,
                    type: getRentTypeCompare(data.paymentType),
                  })}
                </Typography>
                <Typography>
                  {t("I18N_SPACE_ADDRESS")}: {data.street}, {data.building}
                </Typography>
                <Typography>
                  {data.isCommercial
                    ? t("I18N_SPACE_COMMERCE")
                    : t("I18N_SPACE_LIVING")}
                </Typography>
                <Typography>
                  {t("I18N_SPACE_SQUARE", { square: data.square })}
                </Typography>
                <Typography>
                  {t("I18N_SPACE_FLOORS", { floors: data.floors })}
                </Typography>
                <Typography>
                  {t("I18N_SPACE_NEED_DEPOSIT")}:{" "}
                  {data.hasDeposit ? "Yes" : "No"}
                </Typography>
                <Button variant="contained">{t("I18N_SPACE_RENT")}</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={5}>
          {data && <ViewMap coords={[Number(data.lat), Number(data.lon)]} />}
        </Paper>
        <Grid container spacing={2}>
          {details &&
            details.map((row, index) => (
              <DetailsComponent key={index} data={row} />
            ))}
        </Grid>
      </Stack>
    </Page>
  );
};

export default Publication;
