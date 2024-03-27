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
        path: "/signIn/:id",
        element: <SignIn />,
      },
      {
        path: "/findJob",
        element: <FindJob />
      },
      {
        path: "/details/:id",
        element: <JobDetails />
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
