import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const MyAddedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["job._id"],
    queryFn: async () => {
      const res = await axiosSecure.get("/job");
      return res.data;
    },
  });

  if(!jobs && !user){
    return <h1>Loading...</h1>
  }

  const filteredJob = jobs.filter((job) => job.employer === user.email);

  const handleDelete = (job) => {
    Swal.fire({
      title: "Are you really want to delete this test?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/job/${job._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Test Deleted!",
              text: "job event has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-full py-10 mx-auto">
      <div className="py-3 mx-auto text-center w-60">
        <h1 className="text-2xl uppercase font-semibold">All Added Jobs</h1>
      </div>
      <div className="p-2 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredJob.length ? (
            filteredJob.map((job) => (
              <div
                key={job._id}
                className="border rounded-md px-6 py-4 bg-white shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-800">Location: {job.location}</p>
                    <p className="text-gray-800">Category: {job.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(job)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full hover:shadow-md"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1 className="text-center text-3xl font-semibold">
                You did not apply for any job yet.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAddedJobs;
