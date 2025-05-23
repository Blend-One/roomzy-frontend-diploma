import { Stack, SxProps, Theme, useMediaQuery } from "@mui/material";
import UserBlock from "./UserBlock";
import LogoBlock from "./LogoBlock";

const headerSx: SxProps<Theme> = (theme) => ({
  justifyContent: "space-between",
  backgroundColor: "primary.light",
  alignItems: "center",
  padding: theme.spacing(2, 8),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 2),
  },
});

const Header = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  return (
    <Stack component={"header"} sx={headerSx} direction="row" spacing={2}>
      <LogoBlock />
      <UserBlock isMobile={isMobile} />
    </Stack>
  );
};

export default Header;
