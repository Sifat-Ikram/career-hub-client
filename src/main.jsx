import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./components/pages/error_page/ErrorPage";
import HomePage from "./components/pages/home/home_page/HomePage.jsx";
import SignUp from "./components/pages/sign/SignUp.jsx";
import AuthProvider from "./components/provider/AuthProvider.jsx";
import SignIn from "./components/pages/sign/SignIn.jsx";
import FindJob from "./components/pages/find_job/FindJob.jsx";
import JobDetails from "./components/pages/details/JobDetails.jsx";

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
        path: "/signUp",
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
        path: "/details/:id",
        element: <JobDetails />
      }
    ],
  },
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
