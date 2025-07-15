import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";

function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}

export default Home;
