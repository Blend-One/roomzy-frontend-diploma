import { createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";

const theme = createTheme(
  {
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
  },
  ruRU,
);

export default theme;
