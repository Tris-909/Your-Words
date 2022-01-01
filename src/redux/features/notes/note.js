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
    addingNewLabel: (state, action) => {
      const { id, newLable } = action.payload;

      const currentDataList = state.list.data;

      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            labels: [...currentDataList[index].labels, newLable],
          };
        }
      });

      state.list.data = currentDataList;
    },
    removeALabel: (state, action) => {
      const { noteId, labelId } = action.payload;

      const currentDataList = state.list.data;

      currentDataList.forEach((item, index) => {
        if (item.id === noteId) {
          let currentLabelsList = currentDataList[index].labels;

          const deletePosition = currentLabelsList.findIndex(
            (item) => item.id === labelId
          );

          currentLabelsList.splice(deletePosition, 1);

          currentDataList[index] = {
            ...currentDataList[index],
            labels: currentLabelsList,
          };
        }
      });

      state.list.data = currentDataList;
    },
    updateSingleLabelContent: (state, action) => {
      const { noteId, labelId, editValue } = action.payload;

      state.list.status = true;
      const currentDataList = state.list.data;

      currentDataList.forEach((item, index) => {
        if (item.id === noteId) {
          let currentLabelsList = currentDataList[index].labels;

          const changedPosition = currentLabelsList.findIndex(
            (item) => item.id === labelId
          );

          currentLabelsList[changedPosition] = {
            ...currentLabelsList[changedPosition],
            content: editValue,
          };

          currentDataList[index] = {
            ...currentDataList[index],
            labels: currentLabelsList,
          };
        }
      });

      state.list.status = false;
      state.list.data = currentDataList;
    },
    clearNotesState: (state, action) => {
      state.list = {};
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
        status: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const {
  updateLocalXYPosition,
  addingNewLabel,
  removeALabel,
  updateSingleLabelContent,
  clearNotesState,
} = notes.actions;

export default notes.reducer;
