import { Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import theme from "../../theme";

const Logo = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: theme.palette.primary.contrastText,
}));

const LogoBox = styled(Stack)(() => ({
  ":hover": {
    cursor: "pointer",
  },
}));

const logoIconStyle = {
  height: "41px",
  width: "41px",
};

const LogoBlock = () => {
  const navigate = useNavigate();

  return (
    <>
      <LogoBox direction={"row"} onClick={() => navigate("/")}>
        <img style={logoIconStyle} src="favicon.svg" alt="logo-icon" />
        <Logo variant="h1">Roomzy</Logo>
      </LogoBox>
    </>
  );
};
export default LogoBlock;
