import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetail",
  initialState: {},
  reducers: {
    addToBag: (state, action) => {
      state.push(action.payload);
    },
    removeFromBag: (state, action) => {
      return state.filter((itemId) => itemId !== action.payload);
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
