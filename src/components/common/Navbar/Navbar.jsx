import { useState } from "react";
import { TbCalendarSearch } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
import { BsPersonSquare } from "react-icons/bs";
import { MdPersonPin } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //   const { data: currentUser = [] } = useQuery({
  //     queryKey: ['currentUser.email'],
  //     queryFn: async () => {
  //         const res = await axiosPublic.get('/user');
  //         return res.data;
  //     }
  //   });

  //   const loggedUser = currentUser?.find(cUser => cUser.email === (user?.email ?? ""));

  //   const handleLogOut = async () => {
  //     try {
  //       const res = await logOut();
  //       console.log(res.user);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleSignUpClick = (e) => {
    e.stopPropagation();
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
          className="dropdown dropdown-end relative"
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
                  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>
          {dropdownOpen && (
            <ul
              className="menu menu-sm dropdown-content w-32 mt-3 z-[20] py-3 px-1 text-center shadow bg-white dark:bg-gray-800 rounded-box absolute"
              onClick={closeDropdown}
            >
              <li className="w-full">
                <a href="/userProfile">Profile</a>
              </li>
              {/* <li className="w-full">
                {user && (
                  <a
                    className="hover:text-[#02137A]"
                    href={
                      isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"
                    }
                  >
                    Dashboard
                  </a>
                )}
              </li>
              <li className="w-full">
                {user ? (
                  <button
                    className="hover:text-[#02137A]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogOut();
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <a className="hover:text-[#02137A]" href="/signIn">
                    {" "}
                    Sign in
                  </a>
                )}
              </li> */}
              <li className="w-full">
                  {!user && (
                    <a>
                      <details className="dropdown dropdown-left">
                        <summary className="flex justify-center items-center" onClick={handleSignUpClick}>SignUp</summary>
                        <ul className="shadow menu right-16 absolute -mt-6 max-md:-mt-32 bg-white rounded w-72">
                          <li>
                            <div className="flex justify-center items-center p-4 hover:bg-gray-100">
                              <div className="text-4xl mr-4">
                                <BsPersonSquare />
                              </div>
                              <div>
                                <h1 className="text-base font-bold">Employee</h1>
                                <p className="text-xs">Sign in or create your account to manage your profile</p>
                                <div className="flex justify-evenly items-center mt-2">
                                  <button className="bg-white shadow-md p-2"><Link to="/signIn">
                                  Sign In
                                  </Link></button>
                                  <button className="bg-white shadow-md p-2"><Link to="/signUp">
                                  Create Account
                                  </Link></button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-center items-center p-4 hover:bg-gray-100">
                              <div className="text-4xl mr-4">
                                <MdPersonPin />
                              </div>
                              <div>
                                <h1 className="text-base font-bold">Employer</h1>
                                <p className="text-xs">Sign in or create account to find the best candidates</p>
                                <div className="flex justify-evenly items-center mt-2">
                                  <button className="bg-white shadow-md p-2"><Link to="/signIn">
                                  Sign In
                                  </Link></button>
                                  <button className="bg-white shadow-md p-2"><Link to="/signUp">
                                  Create Account
                                  </Link></button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </details>
                    </a>
                  )}
                </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
