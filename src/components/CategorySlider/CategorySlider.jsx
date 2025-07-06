import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300, // below 1300px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1000, // below 1000px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 700, // below 700px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500, // below 700px
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCatSlider,
  });

  console.log(data, "slider");
  let catSlider = data?.data?.data;
  console.log(catSlider, "catSlider");

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <Slider {...settings}>
        {catSlider?.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-1/3 md:w-1/5 lg:w-1/7 my-4 p-2"
          >
            <div className="hover:cursor-pointer bg-slate-100 p-2 rounded-lg shadow-lg">
              <Link>
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-fill pb-3 h-[240px]"
                  />
                </div>
                <h3 className="text-main-color font-semibold">
                  {product.name}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
