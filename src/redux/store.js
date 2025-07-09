import { configureStore } from "@reduxjs/toolkit";
import { brandReducer } from "./brands/brandSlice";
import { categoryReducer } from "./category/category";

export const store = configureStore({
  reducer: {
    brandReducer: brandReducer,
    categoryReducer: categoryReducer,
  },
});
