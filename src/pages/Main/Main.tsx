import { Grid2 as Grid, Paper, Stack, TextField } from "@mui/material";
import Page from "../../components/Page";
import { useGetRoomsListQuery } from "../../services/rooms";
import SpaceCard from "../../components/Space/SpaceCard";
import NoData from "../../components/NoData";
import CitiesField from "../../components/Forms/CitiesField";
import { FormProvider, useForm } from "react-hook-form";
import DistrictsField from "../../components/Forms/DistrictsField";

const Main = () => {
  const { data } = useGetRoomsListQuery({
    page: 1,
    limit: 10,
  });

  const formMethods = useForm({
    defaultValues: {
      cityId: "",
      districtId: "",
    },
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
        <FormProvider {...formMethods}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2}>
                <TextField sx={{ width: "100%" }} label="name" />
                <CitiesField />
                <DistrictsField />
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </Paper>
      {!data?.length && <NoData />}
      <Grid container spacing={2}>
        {data &&
          data.map((row) => (
            <Grid key={row.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <SpaceCard data={row} />
            </Grid>
          ))}
      </Grid>
    </Page>
  );
};

export default Main;
