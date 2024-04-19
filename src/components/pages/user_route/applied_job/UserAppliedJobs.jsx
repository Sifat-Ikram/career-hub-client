import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCart from "../../../hooks/useCart";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const UserAppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [cart, refetch] = useCart();

  const selectedCart = cart.filter(item => item.email == user?.email);
  if(!selectedCart){
    return <h1>Loading...</h1>
  }

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

  return (
    <div className="w-11/12 mx-auto pb-10">
      <div className="text-center">
        <h1 className="uppercase text-3xl font-bold mt-10">Applied Jobs</h1>
      </div>
      <div className="p-2 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {selectedCart.length ? (
            selectedCart?.map((item) => (
              <div
                key={item._id}
                className="border rounded-md px-6 py-4 bg-white shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {item.job_title}
                    </h2>
                    <p className="text-gray-800">Location: {item.location}</p>
                    <p className="text-gray-800">Category: {item.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item)}
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

export default UserAppliedJobs;
