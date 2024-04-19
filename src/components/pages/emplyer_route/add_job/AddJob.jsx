import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Cover from "../../../hooks/Cover";
import img from "../../../../assets/findjob.png"
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const AddJob = () => {
  const axiosPublic = useAxiosPublic();
  const {  user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const jobInfo = {
      employer: user.email,
      job_title: data.job_title,
      company_name: data.company_name,
      location: data.location,
      employment_type: data.employment_type,
      category: data.category,
      experience: data.experience,
      requirements: data.requirements,
      benefits: data.benefits,
      posting_date: data.posting_date,
      application_deadline: data.application_deadline,
      skills: data.skills,
      salary_compensation: data.salary_compensation,
      contact_information: data.contact_information,
      job_description: data.job_description,
      company_overview: data.company_overview,
    };

    const jobRes = await axiosPublic.post("/job", jobInfo);

    if (jobRes.data.insertedId) {
      Swal.fire("job added successfully");
      reset();
    }
  };
  return (
    <div>
      <div className="lg:w-5/6 mx-auto">
        <Cover img={img} title={"Add A Job"} />
        <div className="lg:w-4/5 min-h-screen mx-auto mt-14">
          <div className="flex-col space-y-12 hero-content">
            <div className="w-full card shrink-0">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job Title</span>
                  </label>
                  <input
                    type="text"
                    {...register("job_title")}
                    placeholder="job title"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("company_name")}
                    placeholder="Company Name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    {...register("location")}
                    placeholder="Enter location"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Employment Type</span>
                  </label>
                  <input
                    type="text"
                    {...register("employment_type")}
                    placeholder="Enter employment type"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <input
                    type="text"
                    {...register("category")}
                    placeholder="Type the category"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Experience</span>
                  </label>
                  <input
                    {...register("experience")}
                    placeholder="Type your experience"
                    type="text"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job Requirements</span>
                  </label>
                  <input
                    type="text"
                    {...register("requirements")}
                    placeholder="Type requirements for this job"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job Benefits</span>
                  </label>
                  <input
                    type="text"
                    {...register("benefits")}
                    placeholder="Job benefits"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last apply date</span>
                  </label>
                  <input
                    type="date"
                    {...register("application_deadline")}
                    placeholder="Last apply date"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job posting Date</span>
                  </label>
                  <input
                    type="date"
                    {...register("posting_date")}
                    placeholder="Include Job posting Date"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type required Skills</span>
                  </label>
                  <input
                    {...register("skills")}
                    type="text"
                    placeholder="Required skills"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contact Information</span>
                  </label>
                  <input
                    {...register("contact_information")}
                    type="text"
                    placeholder="Contact Information"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Salary range (In Dollar)</span>
                  </label>
                  <input
                    {...register("salary_compensation")}
                    type="text"
                    placeholder="e.g $50,000 - $60,000 per year"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job Description</span>
                  </label>
                  <textarea
                    {...register("job_description")}
                    className="textarea textarea-bordered"
                    placeholder="Job description"
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Overview</span>
                  </label>
                  <textarea
                    {...register("company_overview")}
                    className="textarea textarea-bordered"
                    placeholder="Company Overview"
                  ></textarea>
                </div>
                <div className="mt-6 form-control">
                  <button className="buttons">
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
