import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";

export const getAuth = createAsyncThunk("user/getAuth", async () => {
  const auth = await Auth.currentAuthenticatedUser();
  const { identityId } = await Auth.currentUserCredentials();

  if (auth.username) {
    // Return this for normal signIn user
    return {
      ...auth.attributes,
      id: identityId,
    };
  }

  return auth;
});

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userId) => {
    try {
      const data = await API.graphql(
        graphqlOperation(getUser, {
          id: userId,
        })
      );
      return data.data.getUser;
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
  reducers: {
    updateUserInfoLocally: (state, action) => {
      const { lockEdit, name, avatarSource } = action.payload;
      state.userInfo.data = {
        ...state.userInfo.data,
        lockEdit: lockEdit ? lockEdit : state.userInfo.data.lockEdit,
        name: name ? name : state.userInfo.data.name,
        avatarSoure: avatarSource
          ? avatarSource
          : state.userInfo.data.avatarSource,
      };
    },
  },
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

export const { updateUserInfoLocally } = user.actions;

export default user.reducer;
