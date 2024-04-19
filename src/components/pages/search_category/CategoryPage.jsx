import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/footer/Footer";

const CategoryPage = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

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

  const getFilteredJobs = () => {
    let filteredJobs = jobs;
    if (id) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.job_title.toLowerCase().includes(id) ||
          job.skills.toLowerCase().includes(id) ||
          job.category.toLowerCase().includes(id)
      );
    }
    return filteredJobs;
  };

  const filteredJobs = getFilteredJobs();

  if (jobsLoading || jobsError) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  return (
    <div>
      <Navbar />
      <div className="py-4 my-5">
        <h1 className="mt-5 mb-10 text-xl font-semibold">
          Search result for : <span className="uppercase">{id}</span>
        </h1>
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
      <Footer />
    </div>
  );
};

export default CategoryPage;
