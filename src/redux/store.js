import { configureStore } from "@reduxjs/toolkit";
import { brandReducer } from "./brands/brandSlice";
import { categoryReducer } from "./category/category";
import { subCategoryReducer } from "./subCategory/subCategory";
import { wishListReducer } from "./wishList/wishList";

export const store = configureStore({
  reducer: {
    brandReducer: brandReducer,
    categoryReducer: categoryReducer,
    subCategoryReducer: subCategoryReducer,
    wishListReducer: wishListReducer,
  },
});
