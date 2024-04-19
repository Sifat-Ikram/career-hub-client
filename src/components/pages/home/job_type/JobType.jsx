import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";

const JobType = () => {
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    Aos.init({ duration: 3333 });
  }, []);

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      const res = await axiosPublic.get("/job");
      return res.data;
    },
  });

  if (jobsLoading || jobsError) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const selectedDinnerMenu = jobs.filter(
    (item) => item.category === "Administration"
  );
  const selectedLunchMenu = jobs.filter(
    (item) => item.category === "Technology"
  );

  return (
    <div className="container mx-auto pb-5">
      <h1 className="text-xl font-semibold mb-8 text-center">
      Explore Job Types
      </h1>
      <Tabs selectedClassName="bg-blue-900">
        <TabList className="flex justify-center gap-16 mb-8">
          <Tab className="tab-style">
            <NavLink
              style={({ isActive }) => ({
                background: isActive ? "#C74208" : "#FFFFFF",
              })}
              className="text-white px-3 py-2 rounded-md"
            >
              Remote
            </NavLink>
          </Tab>
          <Tab className="tab-style">
            <NavLink
              style={({ isActive }) => ({
                background: isActive ? "#C74208" : "#FFFFFF",
              })}
              className="text-white px-4 py-2 rounded-md"
            >
              OnSite
            </NavLink>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col mx-auto gap-3">
            {selectedLunchMenu.map((item) => (
              <div key={item._id} data-aos="fade-down" className="card-style">
                <div className="shadow rounded-md w-11/12 p-4 mx-auto">
                  <h2 className="text-lg font-semibold mb-1">
                    {item.job_title}
                  </h2>
                  <p>Location: {item.location}</p>
                  <p className="text-gray-800 mt-1">
                    {" "}
                    Deadline: {item.application_deadline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-col mx-auto gap-3">
            {selectedDinnerMenu.map((item) => (
              <div key={item._id} data-aos="fade-down" className="card-style">
                <div className="shadow rounded-md w-11/12 p-4 mx-auto">
                  <h2 className="text-lg font-semibold mb-1">
                    {item.job_title}
                  </h2>
                  <p>Location: {item.location}</p>
                  <p className="text-gray-800 mt-1">
                    {" "}
                    Deadline: {item.application_deadline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default JobType;
