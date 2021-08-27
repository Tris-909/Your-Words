import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listImages } from "graphql/queries";

export const fetchImages = createAsyncThunk(
  "images/listImages",
  async (userId) => {
    const { data } = await API.graphql(
      graphqlOperation(listImages, {
        filter: {
          userId: {
            eq: userId,
          },
        },
      })
    );

    return data.listImages.items;
  }
);

const initialState = {
  images: {
    data: [],
    status: false,
    error: {},
  },
};

export const images = createSlice({
  name: "images",
  initialState,
  reducers: {
    createImagesLocally: (state, action) => {
      const { createdImages } = action.payload;

      state.images.data = [...state.images.data, createdImages];
    },
  },
  extraReducers: {
    [fetchImages.pending.type]: (state, action) => {
      state.images = {
        status: true,
        data: [],
        error: {},
      };
    },
    [fetchImages.fulfilled.type]: (state, action) => {
      state.images = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [fetchImages.rejected.type]: (state, action) => {
      state.images = {
        status: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const { createImagesLocally } = images.actions;

export default images.reducer;
