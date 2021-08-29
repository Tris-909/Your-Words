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
  editImage: {
    data: {},
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
    deleteSingleImageInImagesLocally: (state, action) => {
      const { id, imagesId } = action.payload;
      const currentDataList = state.images.data;

      currentDataList.forEach((item, index) => {
        if (item.id === imagesId) {
          const deletePosition = item.list.findIndex((item) => item.id === id);

          item.list.splice(deletePosition, 1);
        }
      });

      state.images.data = currentDataList;
    },
    syncEditImageWithImages: (state, action) => {
      const { id } = action.payload;
      const currentDataList = state.images.data;

      for (let i = 0; i < currentDataList.length; i++) {
        if (currentDataList[i].id === id) {
          currentDataList[i] = state.editImage.data;
        }
      }

      state.images.data = currentDataList;
    },
    // Edit Image
    loadEditImage: (state, action) => {
      const { id } = action.payload;
      const currentDataList = state.images.data;

      const selectedImage = currentDataList.filter((item) => item.id === id);

      state.editImage.data = selectedImage[0];
    },
    updateEditImage: (state, action) => {
      const { imageID } = action.payload;
      const currentEditImage = state.editImage.data;

      const deletePosition = currentEditImage.list.map(
        (item) => item.id === imageID
      );
      currentEditImage.list.splice(deletePosition, 1);

      state.editImage.data = currentEditImage;
    },
    updateEditImageListItem: (state, action) => {
      const { imageID, newSource } = action.payload;
      const currentEditImage = state.editImage.data;

      for (let i = 0; i < currentEditImage.list.length; i++) {
        if (currentEditImage.list[i].id === imageID) {
          currentEditImage.list[i].source = newSource;
        }
      }

      state.editImage.data = currentEditImage;
    },
    addImagesforEditImage: (state, action) => {
      const { newImagesList } = action.payload;
      const currentEditImage = state.editImage.data;

      currentEditImage.list = [...currentEditImage.list, ...newImagesList];
      state.editImage.data = currentEditImage;
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

export const {
  createImagesLocally,
  updateImagesLocally,
  deleteImagesLocally,
  deleteSingleImageInImagesLocally,
  syncEditImageWithImages,
  // Edit Image
  loadEditImage,
  updateEditImage,
  updateEditImageListItem,
  addImagesforEditImage,
} = images.actions;

export default images.reducer;
