import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./bagSlice";
import itemsSlice from "./itemSlice";
import userSlice from "./userDetail";
import authSlice from "./authStatus";

const myntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    bag: bagSlice.reducer,
    authStatus: authSlice.reducer,
    userDetail: userSlice.reducer,
  },
});

export default myntraStore;
