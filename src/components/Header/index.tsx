import { Stack } from "@mui/material";
import theme from "../../theme";
import UserBlock from "./UserBlock";
import LogoBlock from "./LogoBlock";

const headerStyle: React.CSSProperties = {
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.light,
  alignItems: "center",
  padding: theme.spacing(2, 8),
};

const Header = () => {
  return (
    <Stack component={"header"} style={headerStyle} direction="row" spacing={2}>
      <LogoBlock />
      <UserBlock />
    </Stack>
  );
};

export default Header;
