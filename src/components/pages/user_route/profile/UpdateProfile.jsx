import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
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

  console.log(profileData);
  const { 
    displayName,
    photoUrl,
    email,
    phoneNumber,
    location,
    facebook,
    linkedin,
    professionalSummary,
    role
  } = profileData;

  const onSubmit = async(data) => {
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log("Form submitted with data:", data);
    console.log(res.data);
  
    // Update profile data
    const updatedProfileData = {
        displayName: data.name !== undefined ? data.name : displayName,
        photoUrl: res.data.data.display_url || photoUrl,
        email: data.email !== undefined ? data.email : email,
        role: data.role !== undefined ? data.role : role,
        phoneNumber: data.phoneNumber !== undefined ? data.phoneNumber : phoneNumber,
        location: data.location !== undefined ? data.location : location,
        facebook: data.facebook !== undefined ? data.facebook : facebook,
        linkedin: data.linkedin !== undefined ? data.linkedin : linkedin,
        professionalSummary: data.professionalSummary !== undefined ? data.professionalSummary : professionalSummary,
        workExperiences: data.workExperiences !== undefined ? 
          data.workExperiences.map((experience) => ({
            id: experience.id !== undefined ? experience.id : null,
            jobTitle: experience.jobTitle !== undefined ? experience.jobTitle : "",
            companyName: experience.companyName !== undefined ? experience.companyName : "",
            employmentDates: experience.employmentDates !== undefined ? experience.employmentDates : "",
            responsibilities: experience.responsibilities !== undefined ? experience.responsibilities : "",
          })) : workExperiences,
        educationHistory: data.educationHistory !== undefined ? 
          data.educationHistory.map((education) => ({
            id: education.id !== undefined ? education.id : null,
            degree: education.degree !== undefined ? education.degree : "",
            institution: education.institution !== undefined ? education.institution : "",
            graduationYear: education.graduationYear !== undefined ? education.graduationYear : "",
            description: education.description !== undefined ? education.description : "",
          })) : educationHistory,
        skills: data.skills !== undefined ? data.skills : [],
        preferredJobTitle: data.preferredJobTitle !== undefined ? data.preferredJobTitle : "",
        preferredLocation: data.preferredLocation !== undefined ? data.preferredLocation : "",
        languages: data.languages !== undefined ? 
          data.languages.map((language) => ({
            id: language.id !== undefined ? language.id : null,
            name: language.name !== undefined ? language.name : "",
            proficiency: language.proficiency !== undefined ? language.proficiency : "",
          })) : languages,
        certificationsAwards: data.certificationsAwards !== undefined ? 
          data.certificationsAwards.map((item) => ({
            id: item.id !== undefined ? item.id : null,
            title: item.title !== undefined ? item.title : "",
            issuer: item.issuer !== undefined ? item.issuer : "",
          })) : certificationsAwards,
        volunteerExperiences: data.volunteerExperiences !== undefined ? 
          data.volunteerExperiences.map((experience) => ({
            id: experience.id !== undefined ? experience.id : null,
            position: experience.position !== undefined ? experience.position : "",
            organization: experience.organization !== undefined ? experience.organization : "",
            startDate: experience.startDate !== undefined ? experience.startDate : "",
            endDate: experience.endDate !== undefined ? experience.endDate : "",
            description: experience.description !== undefined ? experience.description : "",
          })) : volunteerExperiences,
      };
      
  
    console.log(updatedProfileData);
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

        {/* Work Experience Section */}
        <div className="bg-white p-4 mb-10">
          <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
          {/* List of Work Experience */}
          {profileData.workExperiences?.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name={`workExperiences[${index}].jobTitle`}
                    defaultValue={experience.jobTitle}
                    {...register(`workExperiences.${index}.jobTitle`)}
                    className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                  />
                </div>
                <button
                  className="text-[#C74208] hover:underline focus:outline-none focus:ring focus:ring-[#C74208] transition duration-300 ease-in-out"
                  type="button"
                >
                  View Details
                </button>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name={`workExperiences[${index}].companyName`}
                  defaultValue={experience.companyName}
                  {...register(`workExperiences.${index}.companyName`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Employment Dates
                </label>
                <input
                  type="text"
                  name={`workExperiences[${index}].employmentDates`}
                  defaultValue={experience.employmentDates}
                  {...register(`workExperiences.${index}.employmentDates`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Responsibilities
                </label>
                <textarea
                  name={`workExperiences[${index}].responsibilities`}
                  defaultValue={experience.responsibilities}
                  {...register(`workExperiences.${index}.responsibilities`)}
                  className="p-4 bg-gray-100 rounded-lg w-full"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="bg-white p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          {/* List of Education History */}
          {profileData.educationHistory?.map((education, index) => (
            <div key={index} className="mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  name={`educationHistory[${index}].degree`}
                  defaultValue={education.degree}
                  {...register(`educationHistory.${index}.degree`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name={`educationHistory[${index}].institution`}
                  defaultValue={education.institution}
                  {...register(`educationHistory.${index}.institution`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Graduation Year
                </label>
                <input
                  type="text"
                  name={`educationHistory[${index}].graduationYear`}
                  defaultValue={education.graduationYear}
                  {...register(`educationHistory.${index}.graduationYear`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name={`educationHistory[${index}].description`}
                  defaultValue={education.description}
                  {...register(`educationHistory.${index}.description`)}
                  className="p-4 bg-gray-100 rounded-lg w-full"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="bg-white p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          {/* List of Skills */}
          <div className="grid grid-cols-2 gap-4">
            {profileData.skills?.map((skill, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-2 text-center">
                <input
                  type="text"
                  name={`skills[${index}]`}
                  defaultValue={skill}
                  {...register(`skills.${index}`)}
                  className="text-lg font-semibold text-gray-800 bg-gray-100 p-2 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Job Preferences Section */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Job Preferences</h2>
          {/* Job Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="bg-gray-100 rounded-lg p-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Job Title
                </label>
                <input
                  type="text"
                  name="preferredJobTitle"
                  {...register("preferredJobTitle")}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="bg-gray-100 rounded-lg p-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Location
                </label>
                <input
                  type="text"
                  name="preferredLocation"
                  {...register("preferredLocation")}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Languages</h2>
          {/* List of Languages */}
          {profileData.languages?.map((language, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  name={`languages[${index}].name`}
                  defaultValue={language.name}
                  {...register(`languages.${index}.name`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
                <input
                  type="text"
                  name={`languages[${index}].proficiency`}
                  defaultValue={language.proficiency}
                  {...register(`languages.${index}.proficiency`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications and Awards Section */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Certifications & Awards</h2>
          {/* List of Certifications and Awards */}
          {profileData.certificationsAwards?.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  name={`certificationsAwards[${index}].title`}
                  defaultValue={item.title}
                  {...register(`certificationsAwards.${index}.title`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
                <input
                  type="text"
                  name={`certificationsAwards[${index}].issuer`}
                  defaultValue={item.issuer}
                  {...register(`certificationsAwards.${index}.issuer`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Volunteer Experience Section */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Volunteer Experience</h2>
          {/* List of Volunteer Experiences */}
          {profileData.volunteerExperiences?.map((experience, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    name={`volunteerExperiences[${index}].position`}
                    defaultValue={experience.position}
                    {...register(`volunteerExperiences.${index}.position`)}
                    className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                  />
                </div>
                <button
                  className="text-[#C74208] hover:underline focus:outline-none focus:ring focus:ring-[#C74208] transition duration-300 ease-in-out"
                  type="button"
                >
                  View Details
                </button>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Organization
                </label>
                <input
                  type="text"
                  name={`volunteerExperiences[${index}].organization`}
                  defaultValue={experience.organization}
                  {...register(`volunteerExperiences.${index}.organization`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  name={`volunteerExperiences[${index}].startDate`}
                  defaultValue={experience.startDate}
                  {...register(`volunteerExperiences.${index}.startDate`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="text"
                  name={`volunteerExperiences[${index}].endDate`}
                  defaultValue={experience.endDate}
                  {...register(`volunteerExperiences.${index}.endDate`)}
                  className="text-lg font-semibold bg-gray-100 p-2 rounded-md"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name={`volunteerExperiences[${index}].description`}
                  defaultValue={experience.description}
                  {...register(`volunteerExperiences.${index}.description`)}
                  className="p-4 bg-gray-100 rounded-lg w-full"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
