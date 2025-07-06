import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./../Loader/Loader";
import Slider from "react-slick";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

function ProductDetails() {
  let { id } = useParams();

  let { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    let res = await addToCart(productId);
    console.log("Product added to cart:", res.data.message);
  }

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 800, // below 800px
        settings: {
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    gcTime: 0,
  });

  let productDetail = data?.data?.data;

  return (
    <>
      <div className="container mx-auto">
        {isLoading ? <Loader /> : null}
        <div className="flex gap-5">
          <div className="w-1/2 lg:w-1/4  p-4">
            <Slider {...settings}>
              {productDetail?.images?.map((image) => (
                <img
                  src={image}
                  alt=""
                  className="w-full object-cover rounded-lg"
                />
              ))}
            </Slider>
          </div>
          <div className=" w-1/2 lg:w-3/4 p-4 flex flex-col justify-center ">
            <h2 className="text-2xl font-bold my-5">{productDetail?.title}</h2>
            <p className="text-lg text-gray-600 my-5">
              {productDetail?.description}
            </p>
            <p className="pb-2">{productDetail?.category?.name}</p>
            <div className="flex justify-between items-center">
              <p>${productDetail?.price}</p>
              <p>
                <i className="fas fa-star text-rating-color"></i>{" "}
                {productDetail?.ratingsAverage}
              </p>
            </div>
            <button
              onClick={() => addProductToCart(productDetail?.id)}
              className="bg-main-color w-full text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700 transition-colors duration-300 hover:cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProducts />
    </>
  );
}

export default ProductDetails;
