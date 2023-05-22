import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Pages/Layout/Layout";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductCard from "./Components/ProductCard/ProductCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <div className="regele">
            <h1>daniekdasni</h1>
          </div>
        ),
      },
      {
        path: "/nebunie",
        element: (
          <div className="Copil">
            <ProductCard />
          </div>
        ),
      },
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
