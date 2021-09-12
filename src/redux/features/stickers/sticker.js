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

      state.stickers.data = currentDataList.push(newSticker);
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
        data: action.payload,
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

export const { addStickerLocally } = stickers.actions;

export default stickers.reducer;
