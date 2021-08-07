import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "redux/features/notes/note";
import uesrReducer from "redux/features/user/userInfo";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: uesrReducer,
  },
});
