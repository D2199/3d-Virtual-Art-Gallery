import { createSlice } from "@reduxjs/toolkit";

export const userGallerysSlicer = createSlice({
  name: "userGallerys",
  initialState: {
    value: [],
  },
  reducers: {
    setUserGallerys: (state, action) => {
      state.value = action.payload;
    },
    appendGallery: (state, action) => {
      console.log(state);
      state.value.append(action.payload);
    },
  },
});
export const { setUserGallerys } = userGallerysSlicer.actions;

export default userGallerysSlicer.reducer;
