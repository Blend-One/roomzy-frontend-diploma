import { Stack, SxProps, Theme } from "@mui/material";
import UserBlock from "./UserBlock";
import LogoBlock from "./LogoBlock";
import RentData from "./RentData";

const headerSx: SxProps<Theme> = (theme) => ({
  justifyContent: "space-between",
  backgroundColor: "primary.light",
  alignItems: "center",
  padding: theme.spacing(2, 8),
});

const Header = () => {
  return (
    <Stack component={"header"} sx={headerSx} direction="row" spacing={2}>
      <LogoBlock />
      <RentData />
      <UserBlock />
    </Stack>
  );
};

export default Header;
