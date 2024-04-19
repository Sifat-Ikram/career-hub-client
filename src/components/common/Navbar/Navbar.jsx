import { TbCalendarSearch } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BsPersonSquare } from "react-icons/bs";
import { MdPersonPin } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Navbar = () => {
  const axiosPublic = useAxiosPublic();
  const { user, logOut } = useContext(AuthContext);

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
  const userLoggedLinks = (
    <>
      <li>
        <Link to={"/profile"} className="nav-link font-semibold text-[#C74208]">Home</Link>
      </li>
      <li>
        <Link to={"/bookings"} className="nav-link font-semibold text-[#C74208]">Bookings</Link>
      </li>
      <li onClick={handleLogOut}>
        <Link to="/" className="nav-link font-semibold text-[#C74208]">Log Out</Link>
      </li>
    </>
  );

  const notLoggedLink = (
    <>
      <li>
        <div className="flex justify-center w-72 items-center p-4 hover:bg-gray-200 cursor-pointer">
          <div className="text-4xl mr-4">
            <BsPersonSquare />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-center text-[#C74208]">Sign in</h1>
            <p className="text-xs text-center">
              Sign in to explore more
            </p>
            <div className="flex justify-evenly items-center mt-2">
              <Link to="/signIn" className="shadow-md text-center p-2 w-full rounded-md btn-outline border-2 border-solid hover:border-white border-[#C74208] text-[#C74208] hover:bg-[#C74208] hover:text-white">Sign In</Link>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="flex justify-center w-72 items-center p-4 hover:bg-gray-100 cursor-pointer">
          <div className="text-4xl mr-4">
            <MdPersonPin />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-[#C74208]">Employee or Employer</h1>
            <p className="text-xs">
              Create account to find candidates or to find dream job
            </p>
            <div className="flex justify-evenly items-center mt-2 gap-3">
              <Link to='/signUp/employee' className="shadow-md p-2 w-full rounded-md btn-outline border-2 border-solid hover:border-white border-[#C74208] text-[#C74208] hover:bg-[#C74208] hover:text-white">Employee</Link>
              <Link to="/signUp/employer" className="shadow-md p-2 w-full rounded-md btn-outline border-2 border-solid hover:border-white border-[#C74208] text-[#C74208] hover:bg-[#C74208] hover:text-white">Employer</Link>
            </div>
          </div>
        </div>
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
        <div className="dropdown dropdown-hover dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar relative"
          >
            <div>
              <img
                alt="Profile"
                src={
                  loggedUser
                    ? loggedUser.photoUrl
                    : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                className="w-12 h-12 rounded-full object-cover transition duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-50 relative menu p-0 shadow bg-base-100 rounded-box"
          >
            {loggedUser ? userLoggedLinks : notLoggedLink}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
