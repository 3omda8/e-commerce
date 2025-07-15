import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/category/category";
import { Helmet } from "react-helmet";
import { getSubCategories } from "./../../redux/subCategory/subCategory";
import Loader from "../Loader/Loader";

function Categories() {
  const { category } = useSelector((state) => state.categoryReducer);
  const { subCategory, isLoading } = useSelector(
    (state) => state.subCategoryReducer
  );
  const dispatch = useDispatch();

  const [catName, setCatName] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  console.log(category);
  console.log(subCategory);

  async function handleSubCategories(id, name) {
    dispatch(getSubCategories(id));
    setCatName(name);
  }

  return (
    <>
      <div className="container mx-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Categories</title>
        </Helmet>
        <h2 className="font-bold px-2 py-8 pt-10 text-[3rem] text-center text-green-600 italic">
          Our Categories
        </h2>
        <>
          <div className="flex flex-wrap py-8">
            {category.map((category) => (
              <div
                key={category._id}
                onClick={() => handleSubCategories(category._id, category.name)}
                className="w-[80%] mx-auto sm:mx-0 sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-2 hover:cursor-pointer"
              >
                <a href="#subCat">
                  <div className=" bg-green-200 rounded-lg">
                    <img
                      src={category.image}
                      alt=""
                      className="w-full h-[200px] p-2"
                    />
                    <p className="p-2 text-lg">{category.name}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </>
      </div>
      {catName ? (
        <div id="subCat" className="container mx-auto my-4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-3xl text-main-color font-bold text-center">
                {catName} Sub-Categories
              </h2>
              <div className="flex flex-wrap gap-4 p-8 justify-center">
                {subCategory.map((subCat) => (
                  <p
                    key={subCat._id}
                    className="py-3 px-6 border border-1 bg-green-100 rounded-lg text-2xl font-semibold"
                  >
                    {subCat.name}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Categories;
