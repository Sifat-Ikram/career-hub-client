import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const JobDetails = () => {
    const id = useParams();
    const axiosPublic = useAxiosPublic();

    const {data: jobs = []} = useQuery({
        queryKey: ["job"],
        queryFn: async () => {
          const res = await axiosPublic.get("/job");
          return res.data;
        },
    });
    
    const selectedJob = jobs.find(job => job._id === id);
    console.log(selectedJob);

    console.log(id);
    return (
        <div>
            
        </div>
    );
};

export default JobDetails;