import { createSlice } from "@reduxjs/toolkit";

export const ArtSlicer = createSlice({
  name: "Art",
  initialState: {
    value: null,
  },
  reducers: {
    setArt: (state, action) => {
      state.value = action.payload;
    },
    updateArt: (state, action) => {
      state.value &&= { ...state.value, ...action.payload };
      console.log(state.value);
    },
  },
});
export const { setArt, updateArt } = ArtSlicer.actions;

export default ArtSlicer.reducer;
