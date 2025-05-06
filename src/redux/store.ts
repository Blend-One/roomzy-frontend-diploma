import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import tokenApi from "../services/token";
import roomsApi from "../services/rooms";
import dictionariesApi from "../services/dictionaries";
import sectionTypesApi from "../services/sectionTypes";
import roomTypesApi from "../services/roomTypes";
import attributesApi from "../services/attributes";
import characteristicsApi from "../services/characteristics";
import rentApi from "../services/rent";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [dictionariesApi.reducerPath]: dictionariesApi.reducer,
    [sectionTypesApi.reducerPath]: sectionTypesApi.reducer,
    [roomTypesApi.reducerPath]: roomTypesApi.reducer,
    [attributesApi.reducerPath]: attributesApi.reducer,
    [characteristicsApi.reducerPath]: characteristicsApi.reducer,
    [rentApi.reducerPath]: rentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tokenApi.middleware,
      roomsApi.middleware,
      dictionariesApi.middleware,
      roomTypesApi.middleware,
      attributesApi.middleware,
      characteristicsApi.middleware,
      rentApi.middleware,
      sectionTypesApi.middleware
    ),
});
