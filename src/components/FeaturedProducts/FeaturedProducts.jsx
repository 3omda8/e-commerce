import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

// Ensure you have FontAwesome CSS imported

function FeaturedProducts() {
  let { addToCart } = useContext(CartContext);
  const [wishList, setWishList] = useState(false);

  function handleWishList() {
    setWishList(true);
  }

  async function addProductToCart(productId) {
    await addToCart(productId);
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading, error, isFetching, isError } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getProducts,
  });

  // let [products, setProducts] = useState([]);

  // useEffect(() => {
  //   getProducts();
  //   console.log("Fetching featured products...");
  // }, []);

  // async function getProducts() {
  //   try {
  //     let res = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     let featuredProducts = await res.data.data;
  //     setProducts(featuredProducts);
  //     console.log(featuredProducts);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }

  // return await fetch("https://ecommerce.routemisr.com/api/v1/products")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.error("Error fetching products:", err);
  //   });

  return (
    <div className="container mx-auto">
      {isLoading ? <Loader /> : null}
      {error ? (
        <div className="alert outline outline-red-500 flex justify-center items-center my-5">
          <p className="text-3xl text-main-color">{error.message}</p>
        </div>
      ) : null}
      <div className="flex flex-wrap">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:1/6 px-5 py-3 "
          >
            <div className="hover:cursor-pointer bg-slate-100 p-2 rounded-lg shadow-lg relative">
              <div className="absolute right-6 top-6">
                {wishList ? (
                  <i className="fa-solid fa-heart text-2xl text-main-color"></i>
                ) : (
                  <i className="fa-regular fa-heart text-2xl text-main-color"></i>
                )}
              </div>
              <Link
                to={`/productDetails/${product.id}/${product.category.name}`}
              >
                <div>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full object-fill rounded-t-lg pb-3"
                  />
                </div>
                <h3 className="text-main-color">{product.category.name}</h3>
                <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                <div className="flex justify-between items-center">
                  <p>${product.price}</p>
                  <p>
                    <i className="fas fa-star text-rating-color"></i>{" "}
                    {product.ratingsAverage}
                  </p>
                </div>
              </Link>
              <button
                onClick={() => addProductToCart(product.id)}
                className="bg-main-color w-full text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700 transition-colors duration-300 hover:cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
