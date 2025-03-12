import { Typography } from "@mui/material";
import Page from "../../../components/Page";
import AccountWrapperWidget from "../../../widgets/AccountWrapperWidget";

const MyRentals = () => {
  return (
    <Page withPadding>
      <AccountWrapperWidget>
        <Typography sx={{ background: "rgb(255,0,0, 0.5)" }}>data</Typography>
      </AccountWrapperWidget>
    </Page>
  );
};

export default MyRentals;
