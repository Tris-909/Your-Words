import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "redux/features/notes/note";
import uesrReducer from "redux/features/user/userInfo";
import headingsReducer from "redux/features/heading/heading";
import imagesReducer from "redux/features/images/images";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    headings: headingsReducer,
    user: uesrReducer,
    images: imagesReducer,
  },
});
