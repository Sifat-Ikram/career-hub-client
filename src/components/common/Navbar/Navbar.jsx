import { useState } from "react";
import { TbCalendarSearch } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BsPersonSquare } from "react-icons/bs";
import { MdPersonPin } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Navbar = () => {
  const axiosPublic = useAxiosPublic();
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: currentUser = [] } = useQuery({
    queryKey: ["currentUser.email"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  const loggedUser = currentUser?.find(
    (cUser) => cUser.email === (user?.email ?? "")
  );

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      console.log(res.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navLinks = (
    <>
      <li>
        <a className="nav-link font-semibold text-[#C74208]" href={"/"}>
          Home
        </a>
      </li>
      <li>
        <a className="nav-link font-semibold text-[#C74208]" href={"/findJob"}>
          Jobs
        </a>
      </li>
      <li>
        <a className="nav-link font-semibold text-[#C74208]" href={"/"}>
          Internships
        </a>
      </li>
      <li>
        <a className="nav-link font-semibold text-[#C74208]" href={"/"}>
          Courses
        </a>
      </li>
    </>
  );

  return (
    <nav className="navbar justify-between md:px-10 lg:px-20 z-10 top-0 bg-white w-full">
      <div className="navbar-start md:hidden">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMenu />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 min-h-full bg-base-200 text-base-content">
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-start max-md:navbar-center flex items-center">
        <TbCalendarSearch className="lg:text-4xl md:text-2xl text-black mr-2" />
        <a className="lg:text-4xl text-2xl font-extrabold italic text" href="/">
          Career Hub
        </a>
      </div>
      <div className="navbar-end gap-10 flex items-center">
        <div className="navbar-center hidden md:flex">
          <ul className="flex gap-4">{navLinks}</ul>
        </div>
        <div
          className="dropdown dropdown-bottom dropdown-end dropdown-hover"
          onClick={toggleDropdown}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div>
              <img
                alt="Profile"
                src={
                  user
                      ? loggedUser.photoUrl
                      : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
            >
              <div>
                {loggedUser ? (
                  <ul>
                    <li>home</li>
                    <li>bookings</li>
                    <li onClick={()=> handleLogOut}>Log Out</li>
                  </ul>
                ) : (
                  <div className="shadow menu absolute bg-white rounded w-72">
                    <div className="flex justify-center items-center p-4 hover:bg-gray-100 cursor-pointer">
                      <div className="text-4xl mr-4">
                        <BsPersonSquare />
                      </div>
                      <div>
                        <h1 className="text-base font-bold">Employee</h1>
                        <p className="text-xs">
                          Sign in or create your account to manage your profile
                        </p>
                        <div className="flex justify-evenly items-center mt-2">
                          <button className="bg-white shadow-md p-2">
                            <Link to="/signIn/employee">Sign In</Link>
                          </button>
                          <button className="bg-white shadow-md p-2">
                            <Link to="/signUp/employee">Create Account</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-4 hover:bg-gray-100 cursor-pointer">
                      <div className="text-4xl mr-4">
                        <MdPersonPin />
                      </div>
                      <div>
                        <h1 className="text-base font-bold">Employer</h1>
                        <p className="text-xs">
                          Sign in or create account to find the best candidates
                        </p>
                        <div className="flex justify-evenly items-center mt-2">
                          <button className="bg-white shadow-md p-2">
                            <Link to="/signIn/employer">Sign In</Link>
                          </button>
                          <button className="bg-white shadow-md p-2">
                            <Link to="/signUp/employer">Create Account</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
