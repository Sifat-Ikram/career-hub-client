import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useEmployer = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: isEmployer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user._id"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/user");
        const allEmployer = res.data.filter(
          (item) => item?.role === "employer"
        );
        const employer = allEmployer.find(
          (employer) => employer?.email === user.email
        );
        return employer;
      } catch (error) {
        throw new Error("Failed to fetch employer data");
      }
    },
  });

  return {
    isEmployer,
    isLoading,
    isError,
  };
};

export default useEmployer;
