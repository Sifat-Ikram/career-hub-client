import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://career-hub-server-eight.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;