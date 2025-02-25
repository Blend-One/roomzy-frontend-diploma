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
  },
  cssVariables: true,
});

export default theme;
