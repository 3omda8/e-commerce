import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

function CategoryDetails() {
  let { id } = useParams();

  function getCategoryDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["categoryDetails", id],
    queryFn: getCategoryDetails,
    gcTime: 0,
  });

  // console.log(data?.data?.data);

  let categoryDetails = data?.data?.data;

  // console.log(data?.data?.data.image);

  return (
    <>
      <div className="container mx-auto pt-16">
        {isLoading ? <Loader /> : null}
        <div className="flex gap-5">
          <div className="w-1/2 lg:w-1/4  p-4">
            <img
              src={categoryDetails?.image}
              alt=""
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div className=" w-1/2 lg:w-3/4 p-4 flex flex-col justify-center ">
            <h2 className="text-2xl font-bold my-5">{categoryDetails?.name}</h2>
            <p className="text-lg text-gray-600 my-5">
              {categoryDetails?.slug}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryDetails;
