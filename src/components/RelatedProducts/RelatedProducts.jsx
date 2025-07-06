import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

function RelatedProducts() {
  let { category } = useParams();

  let { addToCart } = useContext(CartContext);
  async function addProductToCart(productId) {
    let res = await addToCart(productId);
    console.log("Product added to cart:", res.data.message);
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300, // below 1300px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900, // below 900px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700, // below 700px
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  function getRelatedProducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        return res?.data?.data?.filter(
          (product) => product.category.name === category
        );
      });
  }

  let { data: relatedProducts } = useQuery({
    queryKey: ["relatedProducts"],
    queryFn: getRelatedProducts,
  });
  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold my-10">Related Products</h2>
        <div className="p-6">
          <Slider {...settings}>
            {relatedProducts?.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-5 py-3 "
              >
                <div className="hover:cursor-pointer bg-slate-100 p-2 rounded-lg shadow-lg">
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
          </Slider>
        </div>
      </div>
    </>
  );
}

export default RelatedProducts;
