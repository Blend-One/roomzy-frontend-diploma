import { Chip, Grid2 as Grid, Paper, Stack } from "@mui/material";
import Page from "../../components/Page";
import useUserData from "../../hooks/useUserData";
import AccountWrapperWidget from "../../widgets/AccountWrapperWidget";
import AppConfig from "../../config";

const Account = () => {
  const userData = useUserData();

  return (
    <Page withPadding>
      <AccountWrapperWidget>
        <Paper sx={{ height: "100%" }}>
          <Stack spacing={2} sx={{ padding: 5 }}>
            <Grid spacing={3} container>
              <Grid size={{ sm: 6 }}>ID:</Grid>
              <Grid size={{ sm: 6 }}>
                <Chip
                  label={userData?.data?.id.toUpperCase()}
                  color="success"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ sm: 6 }}>Почта:</Grid>
              <Grid size={{ sm: 6 }}>
                <Chip
                  label={userData?.data?.email}
                  color="success"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ sm: 6 }}>Роль:</Grid>
              <Grid size={{ sm: 6 }}>
                <Chip
                  label={
                    userData?.data?.role === AppConfig.ROLES.USER
                      ? "Пользователь"
                      : "Менеджер"
                  }
                  color="success"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ sm: 6 }}>Статус:</Grid>
              <Grid size={{ sm: 6 }}>
                <Chip label={"Активный"} color="success" variant="outlined" />
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </AccountWrapperWidget>
    </Page>
  );
};

export default Account;
