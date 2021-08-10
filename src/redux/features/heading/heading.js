import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createHeading } from "graphql/mutations";
import * as uuid from "uuid";

export const createHeadingThunk = createAsyncThunk(
  "headings/createHeading",
  async (userId) => {
    const heading = {
      id: uuid.v1(),
      userId: userId,
      content: "",
      type: "HEADING",
      x: 0,
      y: 0,
    };

    const { data } = await API.graphql(
      graphqlOperation(createHeading, { input: heading })
    );

    console.log("create HEADING", data.createHeading);

    return data.createHeading;
  }
);

const initialState = {
  headings: {
    data: [],
    status: false,
    error: {},
  },
};

export const headings = createSlice({
  name: "headings",
  initialState,
  reducers: {},
  extraReducers: {
    [createHeadingThunk.pending.type]: (state, action) => {
      state.list = {
        status: true,
        data: [],
        error: {},
      };
    },
    [createHeadingThunk.fulfilled.type]: (state, action) => {
      state.list = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [createHeadingThunk.rejected.type]: (state, action) => {
      state.list = {
        status: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export default headings.reducer;
