import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createHeading } from "graphql/mutations";
import { listHeadings } from "graphql/queries";
import * as uuid from "uuid";

export const createHeadingThunk = createAsyncThunk(
  "headings/createHeading",
  async (userId) => {
    const heading = {
      id: uuid.v1(),
      userId: userId,
      content: "TEXT",
      type: "HEADING",
      x: Math.round(window.innerWidth / 2),
      y: Math.round(window.pageYOffset + window.outerHeight / 2),
      width: 200,
      height: 100,
      color: "#ffffff",
      fontSize: 20,
      fontFamily: "Roboto",
      rotateDegree: 0,
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
    };

    const { data } = await API.graphql(
      graphqlOperation(createHeading, { input: heading })
    );

    return [...data.createHeading];
  }
);

export const fetchHeadings = createAsyncThunk(
  "headings/listHeadings",
  async (userId) => {
    const { data } = await API.graphql(
      graphqlOperation(listHeadings, {
        filter: {
          userId: {
            eq: userId,
          },
        },
      })
    );

    return data.listHeadings.items;
  }
);

const initialState = {
  headings: {
    data: [],
    status: false,
    error: {},
  },
  editHeading: {
    data: {},
    status: false,
    error: {},
  },
};

export const headings = createSlice({
  name: "headings",
  initialState,
  reducers: {
    updateHeadingLocally: (state, action) => {
      const {
        id,
        editValue,
        newX,
        newY,
        newWidth,
        newHeight,
        newColor,
        rotateDegree,
        fontSize,
        fontFamily,
        bold,
        italic,
        underline,
        strikeThrough,
      } = action.payload;

      const currentDataList = state.headings.data;

      currentDataList.forEach((item, index) => {
        if (item.id === id) {
          currentDataList[index] = {
            ...currentDataList[index],
            content: editValue ? editValue : currentDataList[index].content,
            x: newX ? newX : currentDataList[index].x,
            y: newY ? newY : currentDataList[index].y,
            width: newWidth ? newWidth : currentDataList[index].width,
            height: newHeight ? newHeight : currentDataList[index].height,
            color: newColor ? newColor : currentDataList[index].color,
            rotateDegree: rotateDegree
              ? rotateDegree
              : currentDataList[index].rotateDegree,
            fontSize: fontSize ? fontSize : currentDataList[index].fontSize,
            fontFamily: fontFamily
              ? fontFamily
              : currentDataList[index].fontFamily,
            bold: bold ? bold : currentDataList[index].bold,
            italic: italic ? italic : currentDataList[index].italic,
            underline: underline ? underline : currentDataList[index].underline,
            strikeThrough: strikeThrough
              ? strikeThrough
              : currentDataList[index].strikeThrough,
          };
        }
      });

      state.headings.data = currentDataList;
    },
    // EDIT HEADING
    getEditHeading: (state, action) => {
      const { headingId } = action.payload;
      const currentHeadingList = state.headings.data;

      const editHeading = currentHeadingList.filter(
        (item) => item.id === headingId
      );

      state.editHeading = editHeading[0];
    },
    updateEditHeading: (state, action) => {
      const {
        content,
        color,
        fontSize,
        rotateDegree,
        fontFamily,
        bold,
        italic,
        underline,
        strikeThrough,
      } = action.payload;

      state.editHeading = {
        ...state.editHeading,
        content: content ? content : state.editHeading.content,
        color: color ? color : state.editHeading.color,
        fontSize: fontSize ? fontSize : state.editHeading.fontSize,
        rotateDegree: rotateDegree
          ? rotateDegree
          : state.editHeading.rotateDegree,
        fontFamily: fontFamily ? fontFamily : state.editHeading.fontFamily,
        bold: bold,
        italic: italic,
        underline: underline,
        strikeThrough: strikeThrough,
      };
    },
    clearEditHeading: (state, action) => {
      state.editHeading = {};
    },
  },

  extraReducers: {
    [createHeadingThunk.pending.type]: (state, action) => {
      state.headings = {
        status: true,
        data: [],
        error: {},
      };
    },
    [createHeadingThunk.fulfilled.type]: (state, action) => {
      state.headings = {
        status: false,
        data: [...state.headings.data, action.payload],
        error: {},
      };
    },
    [createHeadingThunk.rejected.type]: (state, action) => {
      state.headings = {
        status: false,
        data: [],
        error: action.payload,
      };
    },
    [fetchHeadings.pending.type]: (state, action) => {
      state.headings = {
        status: true,
        data: [],
        error: {},
      };
    },
    [fetchHeadings.fulfilled.type]: (state, action) => {
      state.headings = {
        status: false,
        data: action.payload,
        error: {},
      };
    },
    [fetchHeadings.rejected.type]: (state, action) => {
      state.headings = {
        status: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const {
  // Heading
  updateHeadingLocally,
  // Edit Heading
  getEditHeading,
  updateEditHeading,
  clearEditHeading,
} = headings.actions;

export default headings.reducer;
