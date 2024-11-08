import { configureStore } from "@reduxjs/toolkit";
import selectedArt from "./slicers/selectedArt";
import userGallerys from "./slicers/userGallerys";
import auth from "./slicers/auth";

export default configureStore({
  reducer: {
    selectedArt,
    userGallerys,
    auth,
  },
});
