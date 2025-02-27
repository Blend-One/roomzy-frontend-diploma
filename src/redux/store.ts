import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import tokenApi from "../services/token";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenApi.middleware),
});
