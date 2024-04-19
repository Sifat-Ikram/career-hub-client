import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/footer/Footer";

const Internship = () => {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSearch = (e) => {
    setValue(e.target.value.toLowerCase());
  };

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      const res = await axiosPublic.get("/job");
      return res.data;
    },
  });

  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const getFilteredJobs = () => {
    let filteredJobs = jobs;
    if (value) {
      filteredJobs = filteredJobs.filter((job) =>
        job.job_title.toLowerCase().includes(value)
      );
    }
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        (job) => job.category === selectedCategory
      );
    }
    if (selectedLocation) {
      filteredJobs = filteredJobs.filter(
        (job) => job.location === selectedLocation
      );
    }
    return filteredJobs;
  };

  const filteredJobs = getFilteredJobs();

  if (jobsLoading || categoriesLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (jobsError || categoriesError) {
    return <p className="text-center text-red-500">Error fetching data</p>;
  }

  const categories = categoriesData[0]?.category || [];
  const locations = categoriesData[0]?.location || [];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center py-2 md:py-4">
          Find Jobs
        </h1>
        <div className="bg-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-base font-semibold mb-2">Search Job</h2>
          <input
            type="text"
            value={value}
            onChange={handleSearch}
            placeholder="Type category here"
            className="input w-full mb-2"
          />
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/3 px-2 mb-2">
              <h1 className="text-base">Category</h1>
              <select
                className="input w-full"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/3 px-2 mb-2">
              <h1 className="text-base">Location</h1>
              <select
                className="input w-full"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All</option>
                {locations.map((location) => (
                  <option key={location.location} value={location.location}>
                    {location.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="grid grid-cols-1 gap-4">
            {!filteredJobs.length && (
              <p className="text-center text-gray-600">No jobs found.</p>
            )}
            {filteredJobs.map((job) => (
              <div key={job._id} className="shadow rounded-md p-3 bg-base-200">
                <h2 className="text-lg font-semibold mb-1">{job.job_title}</h2>
                <p className="text-sm mb-1">{job.category}</p>
                <p className="text-sm mb-1">{job.location}</p>
                <p className="text-xs text-gray-600 mb-1">
                  Last apply date: {job.application_deadline}
                </p>
                <Link
                  to={`/details/${job._id}`}
                  className="block text-center border border-solid rounded-md py-1 bg-[#C74208] text-white hover:bg-opacity-80"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Internship;