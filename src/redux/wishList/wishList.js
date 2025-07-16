// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// let headers = {
//   token: Cookies.get("userToken"),
// };

// const initialState = {
//   products: [],
//   isLoading: false,
// };

// export const getWishListProducts = createAsyncThunk(
//   "wishList/getWishListProducts",
//   async function () {
//     const data = await axios
//       .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
//         headers,
//       })
//       .then((res) => {
//         console.log(res.data);

//         return res.data;
//       })
//       .catch((err) => {
//         console.error(err, "Error Getting WishList");
//       });
//     return data;
//   }
// );

// export const addProductToWishList = createAsyncThunk(
//   "wishList/addProductToWishList",
//   async function (productId) {
//     const data = await axios
//       .post(
//         "https://ecommerce.routemisr.com/api/v1/wishlist",
//         {
//           productId,
//         },
//         {
//           headers,
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         return res.data;
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     return data.data;
//   }
// );

// export const wishListSlice = createSlice({
//   name: "wishList",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(getWishListProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getWishListProducts.fulfilled, (state, action) => {
//         console.log(action.payload.data);
//         state.isLoading = false;
//       })
//       .addCase(addProductToWishList.fulfilled, (state, action) => {
//         console.log("Product added to wishlist:", action.payload);

//         state.products = action.payload;
//       })
//       .addCase(addProductToWishList.rejected, (state, action) => {
//         console.error("Add to wishlist failed:", action.payload);
//       });
//   },
// });

// export const whishListReducer = wishListSlice.reducer;

// redux/wishList/wishList.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

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
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    );
    return productId;
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
        const id = action.payload;
        const exists = state.products.find((item) => item._id === id);
        if (!exists) {
          state.products.push({ _id: id });
        }
      })
      .addCase(removeProductFromWishList.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const wishListReducer = wishListSlice.reducer;
