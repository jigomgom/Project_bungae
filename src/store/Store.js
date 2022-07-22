import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// import FeedSlice from "../redux/modules/feedSlice";
import BungleSlice from "../redux/modules/BungleSlice";

const store = configureStore({
  reducer: {
    Bungle: BungleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;