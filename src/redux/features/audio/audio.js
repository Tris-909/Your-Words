import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listAudio } from "graphql/queries";

export const fetchAudios = createAsyncThunk(
  "audios/listAudios",
  async (userId) => {
    const { data } = await API.graphql(
      graphqlOperation(listAudio, {
        filter: {
          userId: {
            eq: userId,
          },
        },
      })
    );

    return data.listAudio.items;
  }
);

const initialState = {
  audios: {
    data: [],
    status: false,
    error: {},
  },
};

export const audio = createSlice({
  name: "audio",
  initialState,
  reducers: {
    createAudioLocally: (state, action) => {
      const { createdAudio } = action.payload;
      state.audios.data = [...state.audios.data, createdAudio];
    },
    updateAudioPositionLocally: (state, action) => {
      const { id, newX, newY } = action.payload;

      const currentDataList = state.audios.data;
      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            x: newX ? newX : currentDataList[index].x,
            y: newY ? newY : currentDataList[index].y,
          };
        }
      });
      state.audios.data = currentDataList;
    },
    removeAudioLocally: (state, action) => {
      const { id } = action.payload;
      const currentDataList = state.audios.data;

      const deletePosition = currentDataList.findIndex(
        (item) => item.id === id
      );
      currentDataList.splice(deletePosition, 1);
      state.audios.data = currentDataList;
    },
    clearAudiosState: (state, action) => {
      state.audios = {};
    },
  },
  extraReducers: {
    [fetchAudios.pending.type]: (state, action) => {
      state.audios = {
        status: true,
        data: [],
        error: {},
      };
    },
    [fetchAudios.fulfilled.type]: (state, action) => {
      state.audios = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [fetchAudios.rejected.type]: (state, action) => {
      state.audios = {
        status: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const {
  createAudioLocally,
  updateAudioPositionLocally,
  removeAudioLocally,
  //Clear State
  clearAudiosState,
} = audio.actions;

export default audio.reducer;
