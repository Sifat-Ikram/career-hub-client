import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


const AppliedJobs = () => {
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['booking._id'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cart');
            return res.data;
        }
    });

    const handleDelete = booking => {
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
                axiosSecure.delete(`/bookings/admin/${booking._id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data.result.deletedCount > 0) {
                            console.log("admin delete", res.data.result.deletedCount);
                            
                            Swal.fire({
                                title: "Deleted!",
                                text: "deleted successfully",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div className='w-5/6 py-10 mx-auto'>
            <div className='py-3 mx-auto text-center w-60'>
                <h1 className='text-2xl'>Applied Jobs</h1>
            </div>
            <div className='p-2 mt-10'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-semibold uppercase'>total users: {bookings.length}</h1>
                </div>
                <div className="mt-3 overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#C74208] rounded-lg'>
                            <tr>
                                <th className='text-base font-semibold text-white'>Name</th>
                                <th className='text-base font-semibold text-white'>User</th>
                                <th className='text-base font-semibold text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking) => <tr key={booking._id}>
                                    <td>
                                        <div>
                                            <div>{booking.job_title}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div>{booking.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <MdDelete onClick={() => handleDelete(booking)} className='p-2 text-4xl text-white bg-red-700 rounded-md cursor-pointer'></MdDelete>
                                    </td>
                                </tr>)
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppliedJobs;