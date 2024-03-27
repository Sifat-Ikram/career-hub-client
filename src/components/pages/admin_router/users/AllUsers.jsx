import { useQuery } from '@tanstack/react-query';
import { FaUserGraduate } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${user._id}`)
                    .then(res => {
                        refetch();
                        if (res.data.modifiedCount > 0) {
                            console.log("admin made", res.data.modifiedCount);
                            
                            Swal.fire({
                                title: `${user.displayname} is admin now!`,
                                text: "",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDelete = user => {

        Swal.fire({
            title: "Are you sure, you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Successful!",
                                text: "User has been deleted successfully.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className="w-full py-10 mx-auto">
      <div className="py-3 mx-auto text-center border-t-2 border-b-2 w-60">
        <h1 className="text-2xl uppercase">All Users</h1>
      </div>
      <div className="p-2 mt-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold uppercase">
            Total Users: {users.length}
          </h1>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="table-auto w-full">
            {/* head */}
            <thead className="bg-[#C74208] text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 font-semibold">
                    {user.displayName}
                  </td>
                  <td className="px-4 py-2">
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button onClick={() => handleMakeAdmin(user)}>
                        <FaUserGraduate className="text-2xl bg-[#ac7e13af] text-white p-1 rounded-md"></FaUserGraduate>
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    <MdDelete
                      onClick={() => handleDelete(user)}
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

export default AllUsers;