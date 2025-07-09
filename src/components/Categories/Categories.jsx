import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/category/category";

function Categories() {
  const { category } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  console.log(category);

  return (
    <>
      <div className="container mx-auto">
        <h2 className="font-bold px-2 py-8 pt-10 text-[3rem] text-center text-green-600 italic">
          Our Categories
        </h2>
        <div className="flex flex-wrap py-8">
          {category.map((category) => (
            <div
              key={category._id}
              className="w-[80%] mx-auto sm:mx-0 sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-2"
            >
              <div className=" bg-green-200 rounded-lg">
                <img
                  src={category.image}
                  alt=""
                  className="w-full h-[200px] p-2"
                />
                <p className="p-2 text-lg">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
