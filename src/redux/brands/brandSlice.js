import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBrands = createAsyncThunk("brand/getBrands", async function () {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  return data;
});

const initialState = {
  brands: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload.data;
    });
  },
});

export let brandReducer = brandSlice.reducer;
