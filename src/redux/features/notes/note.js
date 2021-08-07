import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listTodos } from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const fetchListNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (userId) => {
    console.log("userId", userId);
    const { data } = await API.graphql(
      graphqlOperation(listTodos, {
        filter: {
          userId: {
            eq: userId,
          },
        },
      })
    );

    return data.listTodos.items;
  }
);

const initialState = {
  list: {
    data: [],
    status: false,
    error: {},
  },
};

export const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListNotes.pending.type]: (state, action) => {
      state.list = {
        status: true,
        data: [],
        error: {},
      };
    },
    [fetchListNotes.fulfilled.type]: (state, action) => {
      state.list = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [fetchListNotes.rejected.type]: (state, action) => {
      state.list = {
        status: true,
        data: [],
        error: action.payload,
      };
    },
  },
});

export default notes.reducer;
