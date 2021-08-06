import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "redux/features/notes/note";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
