import { Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { hesader, Logo, Spacer } from "./HeaderStyles";

const Header = () => {
  return (
    <Stack component={"header"} style={hesader} direction="row" spacing={2}>
      <Logo variant="h1">Roomzy</Logo>
      <Spacer />
      <Stack direction="row" spacing={2} alignItems="center">
        <AccountCircleIcon fontSize="large" />
        <NotificationsIcon fontSize="large" />
      </Stack>
    </Stack>
  );
};

export default Header;
