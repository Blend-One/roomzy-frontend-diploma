import { slice } from "./slice";

export const { clearTokenState, writeToken, setRedirectPath } = slice.actions;

const authReducer = slice.reducer;
const authSlice = slice;

export { authSlice, authReducer };
