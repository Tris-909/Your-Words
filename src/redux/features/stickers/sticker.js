import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listStickers } from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const fetchStickers = createAsyncThunk(
  "stickers/listStickers",
  async (userId) => {
    const { data } = await API.graphql(
      graphqlOperation(listStickers, {
        filter: {
          userId: {
            eq: userId,
          },
        },
      })
    );

    return data.listStickers.items;
  }
);

const initialState = {
  stickers: {
    data: [],
    status: false,
    error: {},
  },
};

export const stickers = createSlice({
  name: "stickers",
  initialState,
  reducers: {
    addStickerLocally: (state, action) => {
      const { newSticker } = action.payload;

      const currentDataList = state.stickers.data;
      currentDataList.push(newSticker);

      state.stickers.data = currentDataList;
    },
    updateStickerPositionLocally: (state, action) => {
      const { id, newX, newY } = action.payload;

      const currentDataList = state.stickers.data;

      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            x: newX ? newX : currentDataList[index].x,
            y: newY ? newY : currentDataList[index].y,
          };
        }
      });

      state.stickers.data = currentDataList;
    },
    updateStickerSizeLocally: (state, action) => {
      const { id, newWidth, newHeight } = action.payload;

      const currentDataList = state.stickers.data;

      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            width: newWidth ? newWidth : currentDataList[index].width,
            height: newHeight ? newHeight : currentDataList[index].height,
          };
        }
      });

      state.stickers.data = currentDataList;
    },
    removeStickerLocally: (state, action) => {
      const { id } = action.payload;
      const currentDataList = state.stickers.data;

      const deletePosition = currentDataList.findIndex(
        (item) => item.id === id
      );
      currentDataList.splice(deletePosition, 1);
      state.stickers.data = currentDataList;
    },
    clearStickerState: (state, action) => {
      state.stickers = {};
    },
  },
  extraReducers: {
    [fetchStickers.pending.type]: (state, action) => {
      state.stickers = {
        status: true,
        data: [],
        error: {},
      };
    },
    [fetchStickers.fulfilled.type]: (state, action) => {
      state.stickers = {
        status: false,
        data: [...action.payload],
        error: {},
      };
    },
    [fetchStickers.rejected.type]: (state, action) => {
      state.stickers = {
        status: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const {
  addStickerLocally,
  updateStickerPositionLocally,
  updateStickerSizeLocally,
  removeStickerLocally,
  clearStickerState,
} = stickers.actions;

export default stickers.reducer;
