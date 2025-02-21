import { Stack, styled, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import theme from "../theme";
import { useNavigate } from "react-router";

const Spacer = styled(Stack)(() => ({
  flexGrow: 1,
}));

const Logo = styled(Typography)(() => ({
  fontSize: "2.5rem",
  ":hover": {
    cursor: "pointer",
  },
}));

const headerStyle = {
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.primary.light,
  padding: 16,
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack component={"header"} style={headerStyle} direction="row" spacing={2}>
      <Logo variant="h1" onClick={() => navigate("/")}>
        Roomzy
      </Logo>
      <Spacer />
      <Stack direction="row" spacing={2} alignItems="center">
        <AccountCircleIcon fontSize="large" />
        <NotificationsIcon fontSize="large" />
      </Stack>
    </Stack>
  );
};

export default Header;
