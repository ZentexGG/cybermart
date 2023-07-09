import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Pages/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import "./index.css";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";

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
