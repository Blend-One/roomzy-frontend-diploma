import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import tokenApi from "../services/token";
import spaceApi from "../services/space";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [spaceApi.reducerPath]: spaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenApi.middleware, spaceApi.middleware),
});
