import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export let CartContext = createContext();

function CartContextProvider({ children }) {
  let headers = {
    token: Cookies.get("userToken"),
  };

  const [numOfItems, setNumOfItems] = useState(0);

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log("Product added to cart:", res.data);
        toast.success(res?.data?.message);
        setNumOfItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast.error(err?.data?.message);
      });
  }

  async function updateCart(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log("Updated cart:", res);
        return res;
      })
      .catch((err) => {
        console.error("Error updating cart:", err);
      });
  }
  async function removeFromCart(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        console.log("Product removed from cart:", res);
        setNumOfItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        console.error("Error removing product from cart:", err);
      });
  }

  async function getCartProducts() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => {
        console.log("Product added to cart:", res);
        setNumOfItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
      });
  }

  async function clearCart() {
    return await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => {
        console.log("clear cart:", res);
        setNumOfItems(0);
        return res;
      })
      .catch((err) => {
        console.error("Error clearing cart:", err);
      });
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartProducts,
        removeFromCart,
        updateCart,
        clearCart,
        numOfItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
