import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import EmployerAppliedJobs from "../applied_jobs/EmployerAppliedJobs";
import MyAddedJobs from "../my_jobs/MyAddedJobs";
import { Link } from "react-router-dom";

const EmployerHome = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: currentUser = [] } = useQuery({
    queryKey: ["user._id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  if (!currentUser.length) {
    return <h1>Loading...</h1>;
  }

  const profileData = currentUser.find((res) => res.email === user.email);

  console.log(profileData);

  return (
    <div className="bg-gray-100 min-h-screen p-4 space-y-8">
      <div>
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-4 my-4">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={profileData.photoUrl}
              alt="Profile"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">
                {profileData.displayName}
              </h1>
              <Link to={`/dashboard/updateEmployerProfile/${profileData._id}`}>
                <button className="text-sm text-[#C74208]">Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="text-lg font-semibold">{profileData.displayName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-lg font-semibold">{profileData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <p className="text-lg font-semibold">
                {profileData?.phoneNumber}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <p className="text-lg font-semibold">{profileData?.location}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <p className="text-lg font-semibold">{profileData?.facebook}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <p className="text-lg font-semibold">{profileData?.linkedin}</p>
            </div>
          </div>
        </div>

        {/* Professional Summary Section */}
        <div className="bg-white p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">About Your Profession</h2>
          <div className="p-4 rounded-lg">
            <p className="text-lg text-gray-800">
              {profileData?.professionalSummary}
            </p>
          </div>
        </div>
      </div>
      <MyAddedJobs />
      <EmployerAppliedJobs />
    </div>
  );
};

export default EmployerHome;
