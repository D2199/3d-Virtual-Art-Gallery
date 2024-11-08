import { createSlice } from "@reduxjs/toolkit";

export const authSlicer = createSlice({
  name: "auth",
  initialState: {
    value: localStorage.getItem("token") || null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
    isAuth: (state) => {
      return true;
    },
  },
});
export const userSlicer = createSlice({
  name: "userInfo",
  initialState: {
    value: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setAuth, isAuth } = authSlicer.actions;
export const { setUser } = userSlicer.actions;
export const userSlicers = userSlicer.reducer;
export default authSlicer.reducer;
