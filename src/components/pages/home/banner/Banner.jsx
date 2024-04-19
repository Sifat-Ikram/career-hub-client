import { useState } from "react";
import job from "../../../../assets/home/job.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    setValue(e.target.value.toLowerCase());
  };

  return (
    <div
      className="hero min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${job})` }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 absolute inset-0"></div>
      <div className="hero-content text-white text-center relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="mb-3 text-3xl md:text-5xl font-bold">
            Find Your Dream Job
          </h1>
          <p className="mb-3 text-sm md:text-base">
            Explore thousands of opportunities waiting for you. Start your
            journey today.
          </p>
          <div className="flex flex-col mb-5">
            <input
              type="text"
              value={value}
              onChange={handleSearch}
              placeholder="Enter job title or keyword"
              className="input w-full mb-2 text-white bg-transparent border-b border-[#C74208] focus:outline-none focus:border-[#C74208]"
            />
            <Link to={`/searchCategory/${value.toLowerCase()}`}>
              <button className="btn buttons border-[#C74208] w-full">Search</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
