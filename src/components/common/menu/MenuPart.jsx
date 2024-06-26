import { NavLink } from "react-router-dom";
import { MdHomeFilled, MdHomeRepairService } from "react-icons/md";
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import useAdmin from "../../hooks/useAdmin";
import useEmployer from "../../hooks/useEmployer";

const MenuPart = () => {
  const [ isAdmin ] = useAdmin();
  const { isEmployer } = useEmployer();
  return (
    <div className="flex justify-center z-10 bottom-0 w-full bg-white shadow fixed sm:hidden">
      <NavLink
        className="flex flex-col px-2 pt-4 hover:bg-base-300 items-center"
        style={({ isActive }) => ({ background: isActive ? "#DAD8D7" : "" })}
        to={"/"}
      >
        <button>
          <MdHomeFilled className="text-5xl" />
          <p className="text-xl font-semibold">Home</p>
        </button>
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ background: isActive ? "#DAD8D7" : "" })}
        className=""
        to={"/internship"}
      >
        <button className="flex flex-col items-center justify-center pt-6 gap-1">
          <FaBriefcaseMedical className="text-4xl" />
          <p className="text-xl font-semibold">Internships</p>
        </button>
      </NavLink>
      <NavLink
        className="flex flex-col px-2 pt-4 hover:bg-base-300 items-center"
        style={({ isActive }) => ({ background: isActive ? "#DAD8D7" : "" })}
        to={"/findJob"}
      >
        <button>
          <MdHomeRepairService className="text-5xl" />
          <p className="text-xl font-semibold">Jobs</p>
        </button>
      </NavLink>
      <NavLink
        className="flex flex-col px-2 pt-4 hover:bg-base-300 items-center"
        style={({ isActive }) => ({ background: isActive ? "#DAD8D7" : "" })}
        to={isAdmin ? "/dashboard/adminHome" : isEmployer ? "/dashboard/employerHome" : "/dashboard/profile"}
      >
        <button>
          <IoMdPerson className="text-5xl" />
          <p className="text-xl font-semibold">Profile</p>
        </button>
      </NavLink>
    </div>
  );
};

export default MenuPart;
