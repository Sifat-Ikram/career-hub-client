import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./components/pages/error_page/ErrorPage";
import SignUp from "./components/pages/sign/SignUp.jsx";
import AuthProvider from "./components/provider/AuthProvider.jsx";
import SignIn from "./components/pages/sign/SignIn.jsx";
import FindJob from "./components/pages/find_job/FindJob.jsx";
import JobDetails from "./components/pages/details/JobDetails.jsx";
import App from "./App.jsx";
import HomePage from "./components/pages/home/home_page/HomePage.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
import AllUsers from "./components/pages/admin_router/users/AllUsers.jsx";
import AppliedJobs from "./components/pages/admin_router/applied/AppliedJobs.jsx";
import ManageJobs from "./components/pages/admin_router/manage_jobs/ManageJobs.jsx";
import ProfilePage from "./components/pages/user_route/profile/ProfilePage.jsx";
import UpdateProfile from "./components/pages/user_route/profile/UpdateProfile.jsx";
import UserAppliedJobs from "./components/pages/user_route/applied_job/UserAppliedJobs.jsx";
import AddJob from "./components/pages/emplyer_route/add_job/AddJob.jsx";
import MyAddedJobs from "./components/pages/emplyer_route/my_jobs/MyAddedJobs.jsx";
import EmployerAppliedJobs from "./components/pages/emplyer_route/applied_jobs/EmployerAppliedJobs.jsx";
import EmployerHome from "./components/pages/emplyer_route/employer_home/EmployerHome.jsx";
import UpdateEmployerPage from "./components/pages/emplyer_route/employer_home/UpdateEmployerPage.jsx";
import Internship from "./components/pages/internship/Internships.jsx";
import AdminHome from "./components/pages/admin_router/home/AdminHome.jsx";
import CategoryPage from "./components/pages/search_category/CategoryPage.jsx";
import GiveReview from "./components/pages/user_route/give_review/GiveReview.jsx";
import EmployerShortlist from "./components/pages/emplyer_route/shortlist/EmployerShortlist.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signUp/:id",
        element: <SignUp />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/findJob",
        element: <FindJob />
      },
      {
        path: "/internship",
        element: <Internship />
      },
      {
        path: "/details/:id",
        element: <JobDetails />
      },
      {
        path: "/searchCategory/:id",
        element: <CategoryPage />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/allUser",
        element: <AllUsers />
      },
      {
        path: "/dashboard/appliedJobs",
        element: <AppliedJobs />
      },
      {
        path: "/dashboard/manageJob",
        element: <ManageJobs />
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />
      },
      {
        path: "/dashboard/updateProfile/:id",
        element: <UpdateProfile />
      },
      {
        path: "/dashboard/userAppliedJobs",
        element: <UserAppliedJobs />
      },
      {
        path: "/dashboard/addJob",
        element: <AddJob />
      },
      {
        path: "/dashboard/myJobs",
        element: <MyAddedJobs />
      },
      {
        path: "/dashboard/employerAppliedJob",
        element: <EmployerAppliedJobs />
      },
      {
        path: "/dashboard/employerHome",
        element: <EmployerHome />
      },
      {
        path: "/dashboard/updateEmployerProfile/:id",
        element: <UpdateEmployerPage />
      },
      {
        path: "/dashboard/adminHome",
        element: <AdminHome />
      },
      {
        path: "/dashboard/review",
        element: <GiveReview />
      },
      {
        path: "/dashboard/shortlisted",
        element: <EmployerShortlist />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
