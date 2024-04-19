import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import DownloadResumePage from "./DownloadResumePage";

const EmployerAppliedJobs = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosPublic.get("/cart");
      return res.data;
    },
  });

  if (!cart && !user) {
    return <h1>Loading...</h1>;
  }

  const selectedCart = cart?.filter((item) => item.employer === user?.email);

  console.log(selectedCart);

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
          .delete(`/cart/${item._id}`)
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


  const handleShortlist = async(item) => {
    const shortlistInfo = {
      name: user?.displayName,
      item
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
        <h1 className="uppercase text-3xl font-bold mt-10">Applied Jobs</h1>
      </div>
      <div className="p-2 mt-5">
        <div className="grid grid-cols-1 gap-4">
          {selectedCart.length ? (
            selectedCart?.map((item) => (
              <div
                key={item._id}
                className="border rounded-md bg-white shadow-md"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {item.job_title}
                  </h2>
                  <p className="text-gray-800">
                    {" "}
                    Applied by{" "}
                    <span className="font-semibold">{item.name}</span>
                  </p>
                  <p className="text-gray-800">Category: {item.category}</p>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                  <DownloadResumePage email={item.email} />
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md hover:shadow-md"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleShortlist(item)}
                      className="bg-[#C74208] hover:bg-[#C74208] text-white font-semibold py-2 px-4 rounded-md hover:shadow-md"
                    >
                      <MdPlaylistAddCheckCircle className="text-2xl" />
                    </button>
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

export default EmployerAppliedJobs;
