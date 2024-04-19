import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const GiveReview = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const ReviewInfo = {
      name: data.name,
      rating: data.rating,
      testimonial: data.testimonial,
    };

    const reviewRes = await axiosPublic.post(`/review`, ReviewInfo);
    if (reviewRes.data.insertedId) {
      Swal.fire("Review updated successfully");
      reset();
    }
  };

  return (
    <div className="mb-10">
      <div className="w-full mx-auto">
        <div className="text-center mt-10">
          <h1 className="uppercase text-3xl font-bold mt-5 mb-3">Write a review</h1>
        </div>
        <div className="w-11/12 mx-auto mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="my-4 space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                {...register("name")}
                defaultValue={user?.displayName}
                type="text"
                placeholder="Type your name here"
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Rating
              </label>
              <input
                {...register("rating")}
                type="number"
                min="1"
                max="5"
                placeholder="Give a rating (1-5)"
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Review
              </label>
              <textarea
                {...register("testimonial")}
                type="text"
                rows="4"
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Write review"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="buttons w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveReview;
