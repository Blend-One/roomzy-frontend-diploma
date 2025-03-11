import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import BasicBreadcrumbs from "../../components/common/BasicBreadcrumbs";

const Account = () => {
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

export default Account;
