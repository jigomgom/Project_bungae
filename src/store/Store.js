import { configureStore } from "@reduxjs/toolkit";
// import FeedSlice from "../redux/modules/feedSlice";
import BungleSlice from "../redux/modules/BungleSlice";

const store = configureStore({
    reducer:{
        Bungle: BungleSlice,
    },
});

export default store;