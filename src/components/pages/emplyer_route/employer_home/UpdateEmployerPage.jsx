import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateEmployerPage = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  //   const navigate = useNavigate();
  //   const location = useLocation();

  const { data: user = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  const profileData = user.find((res) => res._id === id);

  if (!profileData) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const {
    _id,
    displayName,
    photoUrl,
    email,
    phoneNumber,
    location,
    facebook,
    linkedin,
    professionalSummary,
    role,
  } = profileData;

  const onSubmit = async (data) => {
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // Update profile data
    const updatedProfileData = {
      displayName: data.name !== undefined ? data.name : displayName,
      photoUrl: res.data.data.display_url || photoUrl,
      email: data.email !== undefined ? data.email : email,
      role: data.role !== undefined ? data.role : role,
      phoneNumber:
        data.phoneNumber !== undefined ? data.phoneNumber : phoneNumber,
      location: data.location !== undefined ? data.location : location,
      facebook: data.facebook !== undefined ? data.facebook : facebook,
      linkedin: data.linkedin !== undefined ? data.linkedin : linkedin,
      professionalSummary:
        data.professionalSummary !== undefined
          ? data.professionalSummary
          : professionalSummary,
    };

    const testRes = await axiosPublic.patch(`/user/${_id}`, updatedProfileData);

    if (testRes.data.modifiedCount) {
      Swal.fire("Profile updated!!!");
      reset();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={photoUrl}
              alt="Profile"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">{displayName}</h1>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                defaultValue={displayName}
                {...register("name")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Your photo
              </label>
              <input
                type="file"
                {...register("photo")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md w-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                defaultValue={email}
                {...register("email")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={phoneNumber}
                {...register("phoneNumber")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                defaultValue={location}
                {...register("location")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <input
                type="text"
                defaultValue={facebook}
                {...register("facebook")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="text"
                defaultValue={linkedin}
                {...register("linkedin")}
                className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Professional Summary Section */}
        <div className="bg-white p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Professional Summary</h2>
          <textarea
            defaultValue={professionalSummary}
            {...register("professionalSummary")}
            className="p-4 bg-gray-100 rounded-lg w-full"
            rows={6}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#C74208] text-white py-2 px-4 rounded-md hover:bg-[#C74208] focus:outline-none focus:bg-[#C74208]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployerPage;
