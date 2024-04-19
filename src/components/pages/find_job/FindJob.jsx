import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/footer/Footer";

const FindJob = () => {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
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
    if (selectedExperience) {
      filteredJobs = filteredJobs.filter(
        (job) => job.experience === selectedExperience
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
  const experiences = categoriesData[0]?.experience || [];
  const locations = categoriesData[0]?.location || [];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center py-2 md:py-4">
          Find Jobs
        </h1>
        <div className="lg:flex justify-center">
          <div className="lg:w-full lg:max-w-md bg-gray-100 py-4 px-4 md:px-8">
            <div>
              <h2 className="text-sm md:text-base font-semibold mb-2 md:mb-4">
                Search Job
              </h2>
              <input
                type="text"
                value={value}
                onChange={handleSearch}
                placeholder="Type category here"
                className="input w-full mb-4 text-sm md:text-base"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <h1 className="text-sm md:text-lg">Category</h1>
                <select
                  className="w-[80px]"
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
              <div>
                <h1 className="text-sm md:text-lg">Experience</h1>
                <select
                  className="w-[80px]"
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  <option value="">All</option>
                  {experiences.map((experience) => (
                    <option
                      key={experience.experience}
                      value={experience.experience}
                    >
                      {experience.experience}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h1 className="text-sm md:text-lg">Location</h1>
                <select
                  className="w-[80px]"
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
        </div>
        <div className="px-4 mt-5">
          <div className="grid grid-cols-1 gap-4">
            {!filteredJobs.length && (
              <p className="text-center text-gray-600">No jobs found.</p>
            )}
            {filteredJobs.map((job) => (
              <div key={job._id} className="shadow rounded-md p-3 bg-base-200">
                <h2 className="text-md md:text-lg font-semibold mb-1">
                  {job.job_title}
                </h2>
                <p className="text-sm md:text-base mb-1">{job.category}</p>
                <p className="text-sm md:text-base mb-1">{job.location}</p>
                <div className="flex justify-between pr-1 items-center">
                  <p className="text-xs md:text-sm text-gray-600">
                    Last apply date: {job.application_deadline}
                  </p>
                  <button className="text-xs md:text-xl border-2 border-solid rounded-md p-2 border-[#C74208] hover:text-white text-[#C74208] hover:bg-[#C74208]">
                    <Link to={`/details/${job._id}`}>View Details</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindJob;
