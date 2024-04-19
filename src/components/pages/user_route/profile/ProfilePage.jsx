import { useContext, useState } from "react";
import Footer from "../../../common/footer/Footer";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";

function ProfilePage() {
  const [expandedId, setExpandedId] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: currentUser = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  if (!user) {
    return <h1>Loading...</h1>;
  }
  

  const profileData = currentUser.find((res) => res?.email === user?.email);

  function getProficiencyWidth(proficiency) {
    switch (proficiency) {
      case "Fluent":
        return 100;
      case "Intermediate":
        return 75;
      case "Beginner":
        return 50;
      default:
        return 0;
    }
  }

  // Function to toggle the expand/collapse state of a work experience item
  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const skills = [
    "JavaScript",
    "React.js",
    "Node.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap",
    "SQL",
    "MongoDB",
    "Git",
    "GitHub",
    "UI/UX Design",
  ];

  const workExperiences = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      companyName: "ABC Tech",
      employmentDates: "Jan 2020 - Present",
      responsibilities:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar libero sed ipsum tempor, ac ullamcorper ex consequat.",
    },
    {
      id: 2,
      jobTitle: "Web Developer",
      companyName: "XYZ Solutions",
      employmentDates: "Jun 2018 - Dec 2019",
      responsibilities:
        "Nullam a tortor nec purus luctus euismod. Cras hendrerit, nisi vel lobortis commodo, velit odio luctus dui.",
    },
  ];

  const educationHistory = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of ABC",
      graduationYear: "2020",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar libero sed ipsum tempor, ac ullamcorper ex consequat.",
    },
    {
      id: 2,
      degree: "Master of Business Administration",
      institution: "XYZ University",
      graduationYear: "2018",
      description:
        "Nullam a tortor nec purus luctus euismod. Cras hendrerit, nisi vel lobortis commodo, velit odio luctus dui.",
    },
  ];
  const languages = [
    {
      id: 1,
      name: "English",
      proficiency: "Fluent",
    },
    {
      id: 2,
      name: "Spanish",
      proficiency: "Intermediate",
    },
    {
      id: 3,
      name: "French",
      proficiency: "Beginner",
    },
  ];
  const certificationsAwards = [
    {
      id: 1,
      title: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services (AWS)",
    },
    {
      id: 3,
      title: "Employee of the Month",
      issuer: "ABC Company",
    },
  ];
  const volunteerExperiences = [
    {
      id: 1,
      organization: "Red Cross",
      position: "Volunteer Coordinator",
      startDate: "Jan 2019",
      endDate: "Dec 2020",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar libero sed ipsum tempor, ac ullamcorper ex consequat.",
    },
    {
      id: 2,
      organization: "Local Animal Shelter",
      position: "Dog Walker",
      startDate: "Jun 2018",
      endDate: "Aug 2019",
      description:
        "Nullam a tortor nec purus luctus euismod. Cras hendrerit, nisi vel lobortis commodo, velit odio luctus dui.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-4 my-4">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full"
            src={profileData?.photoURL}
            alt="Profile"
          />
          <div className="ml-4">
            <h1 className="text-xl font-semibold">{profileData.displayName}</h1>
            <Link to={`/dashboard/updateProfile/${profileData._id}`}>
              <button className="text-sm text-[#C74208]">Edit Profile</button>
            </Link>
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
            <p className="text-lg font-semibold">{profileData?.phoneNumber}</p>
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
        <h2 className="text-lg font-semibold mb-4">Professional Summary</h2>
        <div className="p-4 rounded-lg">
          <p className="text-lg text-gray-800">
            {profileData?.professionalSummary}
          </p>
        </div>
      </div>

      {/* Resume/CV Section */}

      {/* Work Experience Section */}
      <div className="bg-white p-4 mb-10">
        <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
        {/* List of Previous Work Experience */}
        {workExperiences.map((experience) => (
          <div key={experience.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{experience.jobTitle}</p>
                <p className="text-sm text-gray-700">
                  {experience.companyName} ({experience.employmentDates})
                </p>
              </div>
              <button
                className="text-[#C74208] hover:underline focus:outline-none transition duration-300 ease-in-out"
                onClick={() => toggleExpand(experience.id)}
              >
                View Details
              </button>
            </div>
            <div className={expandedId === experience.id ? "mt-2" : "hidden"}>
              <p className="text-gray-800">{experience.responsibilities}</p>
            </div>
          </div>
        ))}
      </div>

      {/* education */}
      <div className="bg-white p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Education</h2>
        {/* List of Education History */}
        {educationHistory.map((education) => (
          <div key={education.id} className="mb-4">
            <p className="text-lg font-semibold">{education.degree}</p>
            <p className="text-sm text-gray-700">
              {education.institution} ({education.graduationYear})
            </p>
            <p className="text-gray-800">{education.description}</p>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="bg-white p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        {/* List of Skills */}
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-2 text-center">
              <p className="text-lg font-semibold text-gray-800">{skill}</p>
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
              <p className="text-sm font-medium text-gray-700">
                Preferred Job Title
              </p>
              <p className="text-lg font-semibold">Software Developer</p>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="text-sm font-medium text-gray-700">
                Preferred Location
              </p>
              <p className="text-lg font-semibold">Remote</p>
            </div>
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Languages</h2>
        {/* List of Languages */}
        {languages.map((language) => (
          <div key={language.id} className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{language.name}</p>
              <p className="text-sm font-medium text-gray-700">
                {language.proficiency}
              </p>
            </div>
            <div className="mt-2 bg-gray-100 rounded-lg p-2">
              {/* Visual representation of language proficiency */}
              <div
                className="h-3 bg-blue-500 rounded-lg"
                style={{
                  width: `${getProficiencyWidth(language.proficiency)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications and Awards Section */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Certifications & Awards</h2>
        {/* List of Certifications and Awards */}
        {certificationsAwards.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-sm font-medium text-gray-700">{item.issuer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer Experience Section */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Volunteer Experience</h2>
        {/* List of Volunteer Experiences */}
        {volunteerExperiences.map((experience) => (
          <div key={experience.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{experience.position}</p>
                <p className="text-sm text-gray-700">
                  {experience.organization} ({experience.startDate} -{" "}
                  {experience.endDate})
                </p>
              </div>
              <button
                onClick={() => toggleExpand(experience.id)}
                className="text-[#C74208] hover:underline focus:outline-none transition duration-300 ease-in-out"
              >
                View Details
              </button>
            </div>
            <div className={expandedId === experience.id ? "mt-2" : "hidden"}>
              <p className="text-gray-800">{experience.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
