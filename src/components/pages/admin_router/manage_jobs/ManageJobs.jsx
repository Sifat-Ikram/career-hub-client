import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["job._id"],
    queryFn: async () => {
      const res = await axiosSecure.get("/job");
      return res.data;
    },
  });

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
        <h1 className="text-2xl uppercase font-semibold">All Jobs</h1>
      </div>
      <div className="p-2 mt-10">
        <div className="mt-3 overflow-x-auto">
          <table className="table-auto w-full">
            {/* head */}
            <thead className="bg-[#C74208] text-white">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 font-semibold">
                    <Link to={`/details/${job._id}`}>{job.job_title}</Link>
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    <MdDelete
                      onClick={() => handleDelete(job)}
                      className="text-2xl text-white bg-red-700 p-1 rounded-md cursor-pointer"
                    ></MdDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
