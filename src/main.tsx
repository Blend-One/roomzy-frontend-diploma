import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { YMaps } from "@pbe/react-yandex-maps";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import router from "./router";
import theme from "./theme";
import { store } from "./redux/store";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <YMaps query={{ apikey: import.meta.env.VITE_APP_YANDEX_API_KEY }}>
          <CssBaseline />
          <RouterProvider router={router} />
        </YMaps>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
