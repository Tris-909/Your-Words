import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listTodos } from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const fetchListNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (userId) => {
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
  reducers: {
    updateLocalXYPosition: (state, action) => {
      const { id, newX, newY } = action.payload;

      const currentDataList = state.list.data;

      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            y: newY,
            x: newX,
          };
        }
      });

      state.list.data = currentDataList;
    },
  },
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

export const { updateLocalXYPosition } = notes.actions;

export default notes.reducer;
