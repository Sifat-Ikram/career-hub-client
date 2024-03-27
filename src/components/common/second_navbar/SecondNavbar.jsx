import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const SecondNavbar = () => {
    const [isAdmin] = useAdmin();
    const userNavLink = <>
        <li className='text-lg font-normal'><Link to={"/dashboard"}>
            <h1 className='font-bold'>User home</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/reservation"}>
            <h1 className='font-bold'>Reservation</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard"}>
            <h1 className='font-bold '>Payment History</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/booking"}>
            <h1 className='font-bold'>My Cart</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/addReview"}>
            <h1 className='font-bold'>Add Review</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/myBooking"}>
            <h1 className='font-bold'>My Bookings</h1>
        </Link></li>
    </>

    const adminNavLink = <>
        <li className='text-lg font-normal'><Link to={"/dashboard"}>
            <h1 className='font-bold'>Home</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/addTour"}>
            <h1 className='font-bold'>Add Tour</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/manageTour"}>
            <h1 className='font-bold '>Manage Tours</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/appliedJobs"}>
            <h1 className='font-bold'>Applied Jobs</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/allUser"}>
            <h1 className='font-bold'>Manage Users</h1>
        </Link></li>
        <li className='text-lg font-normal'><Link to={"/dashboard/manageGuide"}>
            <h1 className='font-bold'>Tour Guides</h1>
        </Link></li>
    </>

    return (
        <div>
            <div className="navbar bg-[#C74208] w-full">
                <div className="text-white navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu bg-[#C74208] font-semibold rounded-xs menu-md dropdown-content text-white mt-3 z-[1] p-2 shadow-xl w-52">
                            {
                                isAdmin ? adminNavLink
                                    :
                                    userNavLink
                            }
                        </ul>
                    </div>
                    <a className="cursor-pointer" href='/'>
                        <h1 className='text-3xl italic font-extrabold flex gap-2'><span>Career</span><span>Hub</span></h1>
                    </a>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 space-x-3 font-bold text-white menu menu-horizontal">
                        {
                            isAdmin ? adminNavLink
                                :
                                userNavLink
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SecondNavbar;