import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishListProducts,
  removeProductFromWishList,
} from "../../redux/wishList/wishList";
import Loader from "../Loader/Loader";
import { CartContext } from "../../context/CartContext";

function WishList() {
  const { products, isLoading } = useSelector((state) => state.wishListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishListProducts());
    console.log(products);
  }, []);

  function handleRemove(id) {
    dispatch(removeProductFromWishList(id));
  }

  let { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    await addToCart(productId);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold text-center mb-4 text-main-color">
        My Wishlist
      </h2>
      {products.length === 0 ? (
        <p className="text-center font-semibold text-main-color my-6">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:1/6 px-5 py-3 "
            >
              <div className="hover:cursor-pointer bg-slate-100 p-2 rounded-lg shadow-lg relative">
                <div>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full object-fill rounded-t-lg pb-3"
                  />
                </div>
                <h3 className="text-main-color">{product.category.name}</h3>
                <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                <div className="flex justify-between items-center mt-2">
                  <p>${product.price}</p>
                  <p>
                    <i className="fas fa-star text-rating-color"></i>{" "}
                    {product.ratingsAverage}
                  </p>
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="bg-main-color w-full font-semibold text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700  transition-colors duration-300 hover:cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="bg-red-600 w-full text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700 transition-colors duration-300 hover:cursor-pointer"
                  >
                    <i className="fa-solid fa-trash me-1"></i>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        //   {products.map((item) => (
        //     <div
        //       key={item._id}
        //       className="bg-slate-100 p-4 rounded relative flex flex-col justify-between"
        //     >
        //       <img src={item.imageCover} alt="" className="w-full" />
        //       <div className="py-2">
        //         <p>{item.title.split(" ").slice(0, 3).join(" ")}</p>
        //       </div>

        //       <p className="text-lg text-main-color">{item.price} EGP</p>

        //       <div className="py-4 flex">
        //         <button
        //           onClick={() => addProductToCart(item._id)}
        //           className="btn btn-outline btn-success"
        //         >
        //           Add to cart
        //         </button>
        //         <button
        //           onClick={() => handleRemove(item._id)}
        //           className="btn btn-outline btn-error"
        //         >
        //           <i className="fa-solid fa-trash"></i>
        //           Remove
        //         </button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
}

export default WishList;
