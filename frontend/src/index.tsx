import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Pages/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import "./index.css";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import RegistrationSuccessPage from "./Pages/RegistrationSuccessPage/RegistrationSuccessPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path:"/login",
        element: <LoginPage/>,
      },
      {
        path:"/products",
        element:<ProductsPage/>
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/register-success/:email",
        element: <RegistrationSuccessPage />
      },
      {
        path:"/forgot-password",
        element: <ForgotPasswordPage />
      },
      {
        path:"/reset-password/:token",
        element: <ResetPasswordPage/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
