import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const response = await Auth.currentUserInfo();
  return response;
});

const initialState = {
  userInfo: {
    data: null,
    status: false,
    error: {},
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.pending.type]: (state, action) => {
      state.userInfo = {
        status: true,
        data: null,
        error: {},
      };
    },
    [getUserInfo.fulfilled.type]: (state, action) => {
      state.userInfo = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [getUserInfo.rejected.type]: (state, action) => {
      state.userInfo = {
        status: true,
        data: null,
        error: action.payload,
      };
    },
  },
});

export default user.reducer;
