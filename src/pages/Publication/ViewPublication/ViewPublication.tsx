import { useParams } from "react-router";
import Page from "../../../components/Page";
import { useGetSpaceByIdQuery } from "../../../services/space";
import { Grid2 as Grid, Stack, Typography } from "@mui/material";

const ViewPublication = () => {
  const { id } = useParams();
  const { data } = useGetSpaceByIdQuery(id ?? "");

  return (
    <Page withPadding>
      <Stack spacing={2} mt={4}>
        <Typography sx={{background: "rgb(255,0,0, 0.5)"}}>{data.title}</Typography>
        <Grid container spacing={2}>
          <Grid size={{sm: 8}}>
            <Typography sx={{background: "rgb(255,0,0, 0.5)"}}>{data.title}</Typography>
          </Grid>
          <Grid size={{sm: 4}}>
            <Typography sx={{background: "rgb(255,0,0, 0.5)"}}>{data.title}</Typography>
          </Grid>
        </Grid>
      </Stack>
    </Page>
  );
};

export default ViewPublication;
