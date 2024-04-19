import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const JobCategories = () => {
  const axiosPublic = useAxiosPublic();
  const [value, setValue] = useState("");

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Search Categories
        </h2>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="flex flex-row gap-3">
            <select
              value={value}
              onChange={handleSelectChange}
              className="w-full select select-bordered"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <Link to={`/searchCategory/${value.toLowerCase()}`}>
              <button className="buttons w-full lg:w-auto">Search</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCategories;
