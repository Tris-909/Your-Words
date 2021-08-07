import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { byUsername } from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (username) => {
    try {
      const data = await API.graphql(
        graphqlOperation(byUsername, {
          username: username,
        })
      );
      return data.data.byUsername.items[0];
    } catch (error) {
      console.log("ERROR", error);
    }
  }
);

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
