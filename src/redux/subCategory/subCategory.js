import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubCategories = createAsyncThunk(
  "category/getSubCategories",
  async function (id) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    return data;
  }
);

const initialState = {
  subCategory: [],
  isLoading: false,
};

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSubCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subCategory = action.payload.data;
        state.isLoading = false;
      });
  },
});

export const subCategoryReducer = subCategorySlice.reducer;
