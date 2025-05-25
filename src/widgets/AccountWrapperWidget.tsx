import { Stack, Grid2 as Grid } from "@mui/material";
import { FC, PropsWithChildren } from "react";

// import BasicBreadcrumbs from "../components/common/BasicBreadcrumbs";
import AccountMenu from "../components/AccountMenu";
import NoData from "../components/NoData";

const AccountWrapperWidget: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack spacing={3} mt={4} mb={4} flexGrow={1} minHeight={0}>
      {/* <BasicBreadcrumbs /> */}
      <Grid container spacing={2} flexGrow={1} minHeight={0}>
        <Grid size={{ sm: 3 }}>
          <AccountMenu />
        </Grid>
        <Grid
          size={{ sm: 9 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {children || <NoData />}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AccountWrapperWidget;
