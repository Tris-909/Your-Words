import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { byUsername } from "graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";

export const getAuth = createAsyncThunk("user/getAuth", async () => {
  const response = await Auth.currentUserInfo();
  return response;
});

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
  auth: {
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
    [getAuth.pending.type]: (state, action) => {
      state.auth = {
        status: true,
        data: null,
        error: {},
      };
    },
    [getAuth.fulfilled.type]: (state, action) => {
      state.auth = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [getAuth.rejected.type]: (state, action) => {
      state.auth = {
        status: true,
        data: null,
        error: action.payload,
      };
    },
  },
});

export default user.reducer;
