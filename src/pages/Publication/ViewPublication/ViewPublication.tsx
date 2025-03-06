import { useParams } from "react-router";
import Page from "../../../components/Page";
import {
  useGetSpaceByIdQuery,
  useGetSpaceDetailsByIdQuery,
} from "../../../services/space";
import {
  Button,
  Chip,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ImgGallery from "../../../components/ImgGallery";
import { useMemo } from "react";

const ViewPublication = () => {
  const { id } = useParams();
  const { data } = useGetSpaceByIdQuery(id ?? "");
  const { data: details } = useGetSpaceDetailsByIdQuery(data.id ?? "");

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
      <Stack spacing={2} mt={4}>
        <Typography sx={{ background: "rgb(255,0,0, 0.5)" }}>
          {data.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ sm: 8 }}>
            <ImgGallery images={images} />
          </Grid>
          <Grid size={{ sm: 4 }}>
            <Paper elevation={5} sx={{ padding: 4 }}>
              <Stack spacing={1}>
                <Typography>Price: {data.price}</Typography>
                <Typography>Payment Type: {data.paymentType}</Typography>
                <Typography>Street: {data.street}</Typography>
                <Typography>Building: {data.building}</Typography>
                <Typography>
                  Commercial: {data.isCommercial ? "Yes" : "No"}
                </Typography>
                <Typography>Square: {data.square} m²</Typography>
                <Typography>Floors: {data.floors}</Typography>
                <Typography>
                  Deposit: {data.hasDeposit ? "Yes" : "No"}
                </Typography>
                <Button variant="contained">Арендовать</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {details &&
            details.map((row) => (
              <>
                <Grid size={{ sm: 3 }}>
                  <Paper elevation={5} sx={{ padding: 2 }}>
                    {row.floor} этаж
                  </Paper>
                </Grid>
                <Grid size={{ sm: 9 }}>
                  <Paper elevation={5} sx={{ padding: 5 }}>
                    <Stack spacing={2}>
                      {row.data.map((dit) => (
                        <Stack spacing={2}>
                          <Stack>{dit.name}</Stack>
                          <Stack direction="row">
                            {dit.details.map((tye) => (
                              <Chip label={tye.name} />
                            ))}
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              </>
            ))}
        </Grid>
      </Stack>
    </Page>
  );
};

export default ViewPublication;
