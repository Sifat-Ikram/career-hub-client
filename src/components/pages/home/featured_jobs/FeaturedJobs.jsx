import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const axiosPublic = useAxiosPublic();
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
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.category.toLowerCase().includes("others")
    );
    return filteredJobs;
  };

  const filteredJobs = getFilteredJobs();

  if (jobsLoading || jobsError) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  return (
    <div className="p-4">
      <div className="py-4 my-5">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold px-3 my-4">Featured Jobs</h1>
        </div>
        <div className="grid gap-4">
          {!filteredJobs.length && (
            <p className="text-center text-gray-600">No jobs found.</p>
          )}
          {filteredJobs.slice(0, 4).map((job) => (
            <div key={job._id} className="shadow rounded-md border-2 border-solid border-gray-600 p-3 bg-base-200">
              <h2 className="text-lg md:text-xl font-semibold mb-1">
                {job.job_title}
              </h2>
              <p className="text-sm md:text-base mb-1">{job.location}</p>
              <p className="text-xs md:text-sm text-gray-600">
                Last apply date: {job.application_deadline}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/findJob">
            <button className="bg-[#C74208] text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-90 transition duration-300">
              View All Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
