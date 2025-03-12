import { Stack, Grid2 as Grid } from "@mui/material";
import { FC, PropsWithChildren } from "react";

import BasicBreadcrumbs from "../components/common/BasicBreadcrumbs";
import AccountMenu from "../components/AccountMenu";
import NoData from "../components/NoData";

const AccountWrapperWidget: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack spacing={3} mt={4}>
      <BasicBreadcrumbs />
      <Grid container spacing={2}>
        <Grid size={{ sm: 3 }}>
          <AccountMenu />
        </Grid>
        <Grid size={{ sm: 9 }}>
          {children}
          {!children && <NoData />}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AccountWrapperWidget;
