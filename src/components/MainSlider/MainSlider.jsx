import slider1 from "../../assets/slider-2.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";
import slider4 from "../../assets/grocery-banner.png";
import slider5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

function MainSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="container mx-auto">
      <div className="flex my-10">
        <div className="w-[95%] mx-auto lg:w-3/4 ">
          <Slider {...settings}>
            <div>
              <img
                src={slider5}
                alt="Slider 1"
                className="w-full h-[260px] lg:h-[400px]"
              />
            </div>
            <div>
              <img
                src={slider1}
                alt="Slider 2"
                className="w-full h-[260px] lg:h-[400px]"
              />
            </div>
            <div>
              <img
                src={slider3}
                alt="Slider 3"
                className="w-full h-[260px] lg:h-[400px]"
              />
            </div>
          </Slider>
        </div>
        <div className="w-0 lg:w-1/4">
          <div className="flex flex-col">
            <img
              src={slider4}
              alt="Grocery Banner 1"
              className="w-full h-[200px] object-cover"
            />
            <img
              src={slider2}
              alt="Grocery Banner 2"
              className="w-full h-[200px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSlider;
