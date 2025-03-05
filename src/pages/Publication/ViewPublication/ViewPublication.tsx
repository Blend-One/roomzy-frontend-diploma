import { useParams } from "react-router";
import Page from "../../../components/Page";
import { useGetSpaceByIdQuery } from "../../../services/space";
import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import ImgGallery from "../../../components/ImgGallery";
import { useMemo } from "react";

const ViewPublication = () => {
  const { id } = useParams();
  const { data } = useGetSpaceByIdQuery(id ?? "");

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
            <Typography>Price: {data.price}</Typography>
            <Typography>Payment Type: {data.paymentType}</Typography>
            <Typography>Street: {data.street}</Typography>
            <Typography>Building: {data.building}</Typography>
            <Typography>
              Commercial: {data.isCommercial ? "Yes" : "No"}
            </Typography>
            <Typography>Square: {data.square} m²</Typography>
            <Typography>Floors: {data.floors}</Typography>
            <Typography>Deposit: {data.hasDeposit ? "Yes" : "No"}</Typography>
            <Button variant="contained">Арендовать</Button>
          </Grid>
        </Grid>
        <Typography sx={{ background: "rgb(255,0,0, 0.5)" }}>
          {data.title}
        </Typography>
      </Stack>
    </Page>
  );
};

export default ViewPublication;
