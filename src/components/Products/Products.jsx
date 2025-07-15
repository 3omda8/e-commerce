import { Helmet } from "react-helmet";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

function Products() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <FeaturedProducts />
    </>
  );
}

export default Products;
