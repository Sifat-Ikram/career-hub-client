import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";

// to do
// there will be a view button and by clicking button, a modal will come up
// in the modal there will be description of applicant and job details

const EmployerShortlist = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { refetch, data: shortlist = [] } = useQuery({
    queryKey: ["shortlist"],
    queryFn: async () => {
      const res = await axiosPublic.get("/shortlist");
      return res.data;
    },
  });

  if (!shortlist && !user) {
    return <h1>Loading...</h1>;
  }

  const selectedList = shortlist?.filter(
    (item) => item.item.employer === user?.email
  );

  console.log(selectedList);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/shortlist/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Item Deleted!",
                text: "This item has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleShortlist = async (item) => {
    const shortlistInfo = {
      name: user?.displayName,
      item,
    };
    // console.log(shortlistInfo);

    const shortlistRes = await axiosPublic.post(`/shortlist`, shortlistInfo);
    if (shortlistRes.data.insertedId) {
      Swal.fire("This person shortlisted successfully");
      refetch();
    }
  };

  return (
    <div className="w-full px-2">
      <div className="text-center">
        <h1 className="uppercase text-3xl font-bold mt-10">Shortlist</h1>
      </div>
      <div className="p-2 mt-5">
        <div className="grid grid-cols-1 gap-4">
          {selectedList.length ? (
            selectedList?.map((item) => (
              <div
                key={item._id}
                className="border rounded-md bg-white shadow-md"
              >
                <div className="p-4 space-y-4">
                  <p className="text-gray-800">
                    <span className="font-semibold">
                      Job Title: {item.item.job_title}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    Applicant Name: {item.item.name}
                  </p>
                  <p className="text-gray-800">
                    Company Name: {item.item.company_name}
                  </p>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                  <div className="flex justify-center gap-5">
                    <div className="tooltip" data-tip="view">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        className="bg-[#C74208] hover:bg-[#C74208] text-white font-semibold py-2 px-4 rounded-md hover:shadow-md"
                      >
                        <FaEye className="text-2xl" />
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <h1 className="mb-4 text-2xl font-semibold">
                            Applicant description
                          </h1>
                          <div className="space-y-2 text-left">
                            <p className="text-gray-800">
                              Job Title:
                              <span className="font-medium">
                                {item.item.job_title}
                              </span>
                            </p>
                            <p className="text-gray-800">
                              Category: <span>{item.item.category}</span>
                            </p>
                            <p className="text-gray-800">
                              Company Name:{" "}
                              <span>{item.item.company_name}</span>
                            </p>
                            <p className="text-gray-800">
                              Employment type :{" "}
                              <span>{item.item.employment_type}</span>
                            </p>
                            <p className="text-gray-800">
                              Experience: <span>{item.item.experience}</span>
                            </p>
                            <p className="text-gray-800">
                              Applicants Name: <span>{item.item.name}</span>
                            </p>
                            <p className="text-gray-800">
                              Job Location: <span>{item.item.location}</span>
                            </p>
                            <p className="text-gray-800">
                              Salary:{" "}
                              <span>{item.item.salary_compensation}</span>
                            </p>
                            <p className="text-gray-800">
                              Applicant availability:{" "}
                              <span>{item.item.availability}</span>
                            </p>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                    <div className="tooltip" data-tip="shortlist">
                      <button
                        onClick={() => handleShortlist(item)}
                        className="bg-[#C74208] hover:bg-[#C74208] text-white font-semibold py-2 px-4 rounded-md hover:shadow-md"
                      >
                        <MdPlaylistAddCheckCircle className="text-2xl" />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="delete">
                      <button
                        onClick={() => handleDelete(item)}
                        className="bg-red-800 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md hover:shadow-md"
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">
              <h1 className="text-3xl font-semibold">No application yet.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerShortlist;
