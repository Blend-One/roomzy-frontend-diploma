import { Grid2 as Grid, Paper, TextField } from "@mui/material";
import Page from "../../components/Page";
import { useGetSpacesListQuery } from "../../services/space";
import SpaceCard from "../../components/Space/SpaceCard";

const Main = () => {
  const { data } = useGetSpacesListQuery({
    priceFrom: 0,
    priceTo: 50000,
    priceUnit: "PER_MONTH",
  });

  return (
    <Page withPadding>
      <Paper
        elevation={2}
        sx={(theme) => ({
          padding: theme.spacing(2),
          margin: theme.spacing(2, 0),
        })}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField sx={{ width: "100%" }} label="name" />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {data &&
          data.map((row) => (
            <Grid key={row.id} size={{ xs: 4 }}>
              <SpaceCard data={row} />
            </Grid>
          ))}
      </Grid>
    </Page>
  );
};

export default Main;
