import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

function ResumeList() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: resumes = [],
    refetch,
    isLoading: loading,
  } = useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/resume?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (resume) => {
    Swal.fire({
      title: "Are you sure you want to delete this resume?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/resume/${resume._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "top-right",
                title: "resume Deleted!",
                text: "This resume has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the resume.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : resumes.length === 0 ? (
        <p>No resumes found</p>
      ) : (
        <ul>
          {resumes.map((resume, index) => (
            <li
              className="border-2 border-solid rounded-md px-3 py-1 w-fit"
              key={index}
            >
              <div className="flex justify-center items-center gap-3">
                {user?.displayName}{" "}
                <button onClick={() => handleDelete(resume)}>
                  <MdDelete className="text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResumeList;
