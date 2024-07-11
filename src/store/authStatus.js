import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authStatus",
  initialState: { status: false },
  reducers: {
    changeAuthStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice;
