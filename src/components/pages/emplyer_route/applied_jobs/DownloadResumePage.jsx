import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const DownloadResumePage = ({ email }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: resume = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const res = await axiosPublic.get("/resume", {
        params: { email: email },
        responseType: "blob",
      });
      return res.data;
    },
  });

  const handleDownload = () => {
    const url = window.URL.createObjectURL(new Blob([resume]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching resume</p>;

  return (
    <div>
      <button onClick={handleDownload} className="btn border-2 border-[#C74208] text-[#C74208]">
        Download
      </button>
    </div>
  );
};

export default DownloadResumePage;
