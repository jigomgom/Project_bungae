import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

// const SERVER_URL = "http://3.37.61.25";
const SERVER_URL = "http://52.79.214.48";

const token = localStorage.getItem("login-token");

// 벙글 생성하기
export const createBungleList = createAsyncThunk(
  "CREATE/createBungleList",
  async (formData) => {
    // console.log( JSON.stringify(formData));
    // console.log( token );
    try {
      const response = await axios.post(`${SERVER_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

const BungleSlice = createSlice({
  name: "Bungle",
  initialState: {
    list: [{}],
  },
  reducers: {},
  extraReducers: {
    // middlewares
    [createBungleList.fulfilled]: (state, action) => {
      console.log("create fullfill");
    },
    [createBungleList.rejected]: (state, action) => {
      console.log("create reject");
    },
  },
});

// export const { changeLoginState } = FeedSlice.actions;
export default BungleSlice.reducer;
