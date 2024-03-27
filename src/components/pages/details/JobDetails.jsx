import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillHourglass } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { RiBriefcaseLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

const JobDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const locate = useLocation();
  const navigate = useNavigate();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      const res = await axiosPublic.get("/job");
      return res.data;
    },
  });
console.log(cart);
  const selectedJob = jobs.find((job) => job._id === id);
  if (isLoading || !selectedJob) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const handleApply = () => {
    if (user) {
      const cartItem = {
        name: user.displayName,
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
      };

      axiosPublic.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "This item is added to the cart",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Oops!!! You aren't signed in. ",
        text: "To add this item to cart you have to sign in first",
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

  const {
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
  } = selectedJob;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-300">
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
                onClick={() => handleApply(selectedJob)}
                className="hover:text-white gap-3 btn-outline btn border-[#C74208] rounded-md flex items-center justify-center px-3 py-2 text-[#C74208] hover:bg-[#C74208]"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
