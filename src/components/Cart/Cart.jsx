import { useContext, useEffect, useState } from "react";
import image1 from "../../assets/EmptyCart.png";
import { CartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function Cart() {
  let { getCartProducts, removeFromCart, updateCart, clearCart } =
    useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCartProducts() {
    let res = await getCartProducts();
    console.log("Cart products:", res.data.data.products);
    setCartItems(res.data.data.products);
    setLoading(false);
  }

  async function handleRemoveFromCart(productId) {
    let res = await removeFromCart(productId);
    console.log("Product removed from cart:", res);
    setCartItems(res.data.data.products);
  }
  async function handleClearCart() {
    let res = await clearCart();
    console.log("Cart cleared:", res);
    setCartItems([]);
  }

  async function handleUpdateCart(productId, count) {
    let res = await updateCart(productId, count);
    console.log("Cart updated:", res);
    setCartItems(res.data.data.products);
  }

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : cartItems.length > 0 ? (
        <div className="container mx-auto py-10">
          <div className=" lg:flex lg:gap-8 p-5 lg:p-0">
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold py-6">Cart</h1>
                <button
                  onClick={() => handleClearCart()}
                  className="btn btn-error ms-4 text-white"
                >
                  Clear Cart
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 shadow-lg rounded-lg bg-slate-100 my-8"
                >
                  <div className="w-1/4 ">
                    <img
                      src={item.product.imageCover}
                      alt="Cart"
                      className="w-full"
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-2xl">{item.product.title}</h3>
                        <p className="text-main-color">
                          {item.product.category.name}
                        </p>
                      </div>
                      <div className="pe-3 font-bold">
                        <p>{item.price} EGP</p>
                      </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="btn btn-outline btn-error"
                        >
                          <i className="fa-solid fa-trash"></i>
                          Remove
                        </button>
                        <button className="btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="size-[1.2em]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                          Add to Wishlist
                        </button>
                      </div>
                      <div className="pt-4 lg:pt-0">
                        <button
                          onClick={() =>
                            handleUpdateCart(item.product.id, item.count + 1)
                          }
                          className="border border-sky-200 py-1 px-4 font-bold rounded text-xl hover:bg-main-color hover:text-white  transition duration-300 hover:cursor-pointer"
                        >
                          +
                        </button>
                        <span className="mx-2">{item.count}</span>
                        <button
                          onClick={() =>
                            handleUpdateCart(item.product.id, item.count - 1)
                          }
                          className="border border-sky-200 py-1 px-4 font-bold rounded text-xl hover:bg-main-color hover:text-white  transition duration-300 hover:cursor-pointer"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/4 border-gray-200 border-2 rounded-lg  pb-6 h-full mt-28">
              <h2 className="text-2xl font-bold py-6 text-main-color ps-6">
                Order Summary
              </h2>

              <div className="flex justify-between pe-5 ps-6 my-4">
                <p className="text-xl ">Number Of Items:</p>
                <p className="text-lg font-bold">{cartItems.length}</p>
              </div>
              <div className="flex justify-between pe-5 ps-6">
                <p className="text-xl font-semibold">Total Price:</p>
                <p className="text-lg font-bold">
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.count,
                    0
                  )}
                  EGP
                </p>
              </div>
              <div className="flex justify-center mt-8">
                <Link to="/checkout">
                  <button className="btn btn-primary text-lg px-8">
                    CheckOut
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col items-center justify-center w-[30%]">
          <img src={image1} alt="Empty Cart" className="w-full object-cover" />
          <p className="text-3xl text-center py-10 text-main-color font-bold">
            Your Cart Is Empty
          </p>
        </div>
      )}
    </>
  );
}

export default Cart;
