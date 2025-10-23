import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const headers = {
  token: Cookies.get("userToken"),
};

const initialState = {
  products: [],
  isLoading: false,
};

export const getWishListProducts = createAsyncThunk(
  "wishList/getWishListProducts",
  async () => {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers,
      }
    );
    return res.data.data;
  }
);

export const addProductToWishList = createAsyncThunk(
  "wishList/addProductToWishList",
  async (productId) => {
    await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    );

    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    return res.data.data;
  }
);

export const removeProductFromWishList = createAsyncThunk(
  "wishList/removeProductFromWishList",
  async (productId) => {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers,
      }
    );
    return productId;
  }
);

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishListProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishListProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(addProductToWishList.fulfilled, (state, action) => {
        const newProduct = action.payload;
        const exists = state.products.find(
          (item) => item._id === newProduct._id
        );
        if (!exists) {
          state.products.push(newProduct);
        }
      })
      .addCase(addProductToWishList.rejected, () => {
        toast.error("Failed to add product to wishlist Please login First");
      })
      .addCase(removeProductFromWishList.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const wishListReducer = wishListSlice.reducer;
