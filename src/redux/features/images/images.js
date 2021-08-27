import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    updateImagesLocally: (state, action) => {
      const { id, newX, newY } = action.payload;

      const currentDataList = state.images.data;

      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            x: newX ? newX : currentDataList[index].x,
            y: newY ? newY : currentDataList[index].y,
          };
        }
      });

      state.images.data = currentDataList;
    },
    deleteImagesLocally: (state, action) => {
      const { id } = action.payload;
      const currentDataList = state.images.data;

      const deletePosition = currentDataList.findIndex(
        (item) => item.id === id
      );
      currentDataList.splice(deletePosition, 1);

      state.images.data = currentDataList;
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

export const { createImagesLocally, updateImagesLocally, deleteImagesLocally } =
  images.actions;

export default images.reducer;
