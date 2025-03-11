import { Stack, Typography, Grid2 as Grid } from "@mui/material";
import BasicBreadcrumbs from "../../../components/common/BasicBreadcrumbs";
import Page from "../../../components/Page";

const MyPublications = () => {
  return (
    <Page withPadding>
      <Stack spacing={3} mt={4}>
        <BasicBreadcrumbs />
        <Grid container spacing={2}>
          <Grid size={{ sm: 4 }}>
            <Typography sx={{ background: "rgb(255,0,0, 0.5)" }}>
              menu
            </Typography>
          </Grid>
          <Grid size={{ sm: 8 }}>
            <Typography sx={{ background: "rgb(255,0,0, 0.5)" }}>
              data
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Page>
  );
};

export default MyPublications;
