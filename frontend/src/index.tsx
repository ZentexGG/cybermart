import { Suspense, lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Loader from "./Pages/Loader/Loader";
import OrderPage from "./Pages/OrderPage/OrderPage";

// Lazy load the pages
const Layout = lazy(() => import("./Pages/Layout/Layout"));
const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./Pages/LoginPage/LoginPage"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage/ProductsPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage/RegisterPage"));
const RegistrationSuccessPage = lazy(
  () => import("./Pages/RegistrationSuccessPage/RegistrationSuccessPage")
);
const ForgotPasswordPage = lazy(
  () => import("./Pages/ForgotPasswordPage/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(
  () => import("./Pages/ResetPasswordPage/ResetPasswordPage")
);
const ProductDetailsPage = lazy(
  () => import("./Pages/ProductDetailsPage/ProductDetailsPage")
);
const UserProfilePage = lazy(
  () => import("./Pages/UserProfilePage/UserProfilePage")
);
const CreateProductPage = lazy(
  () => import("./Pages/CreateProductPage/CreateProductPage")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/register-success/:email",
        element: (
          <Suspense>
            <RegistrationSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: "/reset-password/:token/:email",
        element: (
          <Suspense>
            <ResetPasswordPage />
          </Suspense>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <Suspense>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <Suspense>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/add-product",
        element: (
          <Suspense>
            <CreateProductPage />
          </Suspense>
        ),
      },
      {
        path: "/Order",
        element: (
          <Suspense>
            <OrderPage />
          </Suspense>
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
