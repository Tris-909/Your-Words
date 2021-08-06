import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "aws-amplify";

export const fetchListNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await API.get("notes", "/notes");
  return response;
});

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
