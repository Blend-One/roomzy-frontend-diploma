import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E88E5",
      light: "#6AB7FF",
      dark: "#005CB2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E91E63",
      light: "#FF6090",
      dark: "#B0003A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F4F4F4",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "input:-webkit-autofill": {
            boxShadow: "none",
            WebkitTextFillColor: "#212121",
          },
        },
      },
    },
  },
  cssVariables: true,
});

export default theme;
