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
  },
});
export const { setSelectedArt } = selectedArtSlicer.actions;

export default selectedArtSlicer.reducer;
