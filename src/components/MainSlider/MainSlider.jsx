import slider1 from "../../assets/slide1.jpg";
import slider2 from "../../assets/slide4.webp";
import slider3 from "../../assets/slide2.jpg";
import slider4 from "../../assets/slide5.jpeg";
import slider5 from "../../assets/slide3.jpg";
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
      <div className="flex lg:my-10">
        <div className="w-[95%] mx-auto my-auto lg:w-3/4 ">
          <Slider {...settings}>
            <div>
              <img
                src={slider5}
                alt="Slider 1"
                className="w-full h-[260px] lg:h-[440px]"
              />
            </div>
            <div>
              <img
                src={slider1}
                alt="Slider 2"
                className="w-full h-[260px] lg:h-[440px]"
              />
            </div>
            <div>
              <img
                src={slider3}
                alt="Slider 3"
                className="w-full h-[260px] lg:h-[440px]"
              />
            </div>
          </Slider>
        </div>
        <div className="w-0 lg:w-1/4">
          <div className="flex flex-col">
            <img
              src={slider4}
              alt="Grocery Banner 1"
              className="w-full h-[220px] object-cover"
            />
            <img
              src={slider2}
              alt="Grocery Banner 2"
              className="w-full h-[220px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSlider;
