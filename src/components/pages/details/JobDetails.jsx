import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillHourglass } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { RiBriefcaseLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/footer/Footer";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import ResumeList from "./ResumeList";

const JobDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const locate = useLocation();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    availability: "",
    cover: "",
  });

  const {
    data: jobs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["job._id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/job");
      return res.data;
    },
  });

  const selectedJob = jobs.find((job) => job._id === id);
  if (isLoading || !selectedJob) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const {
    job_title,
    category,
    company_name,
    job_description,
    location,
    employment_type,
    salary_compensation,
    posting_date,
    application_deadline,
    contact_information,
    company_overview,
    benefits,
    experience,
    skills,
  } = selectedJob;

  const handleRadioChange = (event) => {
    setFormData({ ...formData, availability: event.target.value });
  };

  // Ensure handleInputChange updates cover letter state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    if (user) {
      const cartItem = {
        employer: selectedJob?.employer,
        name: user.displayName,
        email: user.email,
        category,
        job_title,
        company_name,
        job_description,
        location,
        employment_type,
        salary_compensation,
        posting_date,
        application_deadline,
        contact_information,
        company_overview,
        benefits,
        experience,
        skills,
        availability: formData.availability,
        cover: formData.cover,
      };

      axiosPublic.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          document.getElementById("my_modal_4").close();
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Your application is submitted",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Oops!!! You aren't signed in. ",
        text: "To apply to a job, you have to sign in first",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signIn", { state: locate.pathname });
        }
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="bg-white rounded-md shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-6">{job_title}</h1>
          <p className="text-base text-center mb-4">{company_name}</p>
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div className="flex items-center mb-2 md:mb-0">
              <FiMapPin className="mr-2" />
              <p className="text-gray-700">{location}</p>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              <RiBriefcaseLine className="mr-2" />
              <p className="text-gray-700">{employment_type}</p>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              <FaMoneyBillAlt className="mr-2" />
              <p className="text-gray-700">{salary_compensation}</p>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              <AiFillHourglass className="mr-2" />
              <p className="text-gray-700">{experience} experience</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About the job</h2>
            <p className="text-gray-700">{job_description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Company Overview</h2>
            <p className="text-gray-700">{company_overview}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Benefits</h2>
            <ul className="list-disc list-inside text-gray-700">{benefits}</ul>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Skills Required</h2>
            <ul className="list-disc list-inside text-gray-700">{skills}</ul>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <div className="flex items-center">
              <IoMdContacts className="mr-2" />
              <p className="text-gray-700">{contact_information}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Application Details</h2>
            <div className="flex items-center">
              <BsCalendar className="mr-2" />
              <p className="text-gray-700">
                Posting Date: {new Date(posting_date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <BsCalendar className="mr-2" />
              <p className="text-gray-700">
                Application Deadline:{" "}
                {new Date(application_deadline).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end mt-10">
              <button
                onClick={
                  user
                    ? () => document.getElementById("my_modal_4").showModal()
                    : () => <Navigate to={"/signIn"} />
                }
                className="hover:text-white gap-3 btn-outline btn border-[#C74208] rounded-md flex items-center justify-center px-3 py-2 text-[#C74208] hover:bg-[#C74208]"
              >
                Apply Now
              </button>
              <dialog
                id="my_modal_4"
                className="fixed modal-box w-full inset-0 z-10 overflow-y-auto"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Applying for {job_title}
                  </h3>
                  <p className="text-gray-600 mb-4">{company_name}</p>
                  <div className="flex flex-col items-start mb-4">
                    <p className="font-medium mb-2">
                      Are you immediately available?
                    </p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="not-available"
                          name="availability"
                          value="No"
                          checked={formData.availability === "No"}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        <label htmlFor="not-available">
                          No, I am currently not available
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="available"
                          name="availability"
                          value="Yes"
                          checked={formData.availability === "Yes"}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        <label htmlFor="available">
                          Yes, I am immediately available
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <h3 className="font-semibold">Cover Letter:</h3>
                    </label>
                    <textarea
                      name="cover"
                      value={formData.cover}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered w-full h-24"
                      placeholder="Your Cover Letter"
                    ></textarea>
                  </div>
                  <div className="mb-4 mt-10 space-y-2">
                    <ResumeList />
                    <FileUpload />
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      type="submit"
                      className="btn py-2 w-1/2 bg-[#C74208] hover:bg-[#C74208] text-white hover:text-white"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn py-2 w-1/2 bg-gray-300 hover:bg-gray-400 text-black hover:text-black border-black"
                      onClick={() =>
                        document.getElementById("my_modal_4").close()
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
