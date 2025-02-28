import { Stack, styled } from "@mui/material";
import theme from "../../theme";
import UserBlock from "./UserBlock";
import LogoBlock from "./LogoBlock";

const Spacer = styled(Stack)(() => ({
  flexGrow: 1,
}));

const headerStyle: React.CSSProperties = {
  backgroundColor: theme.palette.primary.light,
  alignItems: "center",
  padding: theme.spacing(2, 8),
};

const Header = () => {
  return (
    <Stack component={"header"} style={headerStyle} direction="row" spacing={2}>
      <LogoBlock />
      <Spacer />
      <UserBlock />
    </Stack>
  );
};

export default Header;
