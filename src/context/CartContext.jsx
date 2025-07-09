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
  const [cartId, setCartId] = useState(null);

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
        setCartId(res.data.data._id);
        toast.success(res?.data?.message);
        setNumOfItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast.error(err.response.data.message);
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
        setCartId(res.data.data._id);
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
        console.log("get Products:", res);
        setNumOfItems(res.data.numOfCartItems);
        setCartId(res.data.cartId);
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

  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((res) => {
        // console.log("Product added to cart:", res.data);
        // console.log(res.data.session.url, "after check");
        window.location.href = res.data.session.url;
        toast.success(res?.data?.message);
        setNumOfItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast.error(err?.data?.message);
      });
  }
  async function cashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log("Product Cash :", res.data);
        // console.log(res.data.session.url, "after check");
        window.location.href = "https://localhost:5173/";
        setNumOfItems(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast.error(err?.data?.message);
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
        onlinePayment,
        cashPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
