import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "redux/features/notes/note";
import uesrReducer from "redux/features/user/userInfo";
import headingsReducer from "redux/features/heading/heading";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    headings: headingsReducer,
    user: uesrReducer,
  },
});
