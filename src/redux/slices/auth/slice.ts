import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { getTokenData } from "./utils";
import { IAuthState } from "../../../types/user";
import { IToken } from "../../../types/token";
import tokenApi from "../../../services/token";

const clearTokenStateReducer = (state: IAuthState) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  state.isAuthenticated = false;
};

const writeTokenReducer = (
  state: IAuthState,
  { payload }: { payload: IToken }
) => {
  const token = getTokenData(payload.accessToken);

  if (token) {
    state.data = token;
    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
    state.isAuthenticated = true;
  }
};

const setRedirectPathReducer = (
  state: IAuthState,
  action: PayloadAction<string | null>
) => {
  state.redirectPath = action.payload;
};

export const slice = createSlice({
  name: "token",
  initialState,
  reducers: {
    clearTokenState: clearTokenStateReducer,
    writeToken: writeTokenReducer,
    setRedirectPath: setRedirectPathReducer,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(tokenApi.endpoints.login.matchFulfilled, writeTokenReducer)
      .addMatcher(tokenApi.endpoints.refresh.matchFulfilled, writeTokenReducer)
      .addMatcher(
        tokenApi.endpoints.registration.matchFulfilled,
        writeTokenReducer
      )
      .addMatcher(
        tokenApi.endpoints.logout.matchFulfilled,
        clearTokenStateReducer
      );
  },
});
