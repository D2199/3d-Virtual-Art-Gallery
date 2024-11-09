import { createSlice } from "@reduxjs/toolkit";

export const selectedArtSlicer = createSlice({
  name: "SelectedArt",
  initialState: {
    value: null,
  },
  reducers: {
    setSelectedArt: (state, action) => {
      state.value = action.payload;
    },
    updateSelectedArt: (state, action) => {
      state.value &&= { ...state.value, ...action.payload };
      console.log(state.value);
    },
  },
});
export const { setSelectedArt, updateSelectedArt } = selectedArtSlicer.actions;

export default selectedArtSlicer.reducer;
