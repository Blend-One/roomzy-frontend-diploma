import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import tokenApi from "../services/token";
import roomsApi from "../services/rooms";
import dictionariesApi from "../services/dictionaries";
import sectionTypesApi from "../services/sectionTypes";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [dictionariesApi.reducerPath]: dictionariesApi.reducer,
    [sectionTypesApi.reducerPath]: sectionTypesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tokenApi.middleware,
      roomsApi.middleware,
      dictionariesApi.middleware,
      sectionTypesApi.middleware
    ),
});
