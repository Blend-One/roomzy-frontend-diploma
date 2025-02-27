import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
  },
  cssVariables: true,
});

export default theme;
