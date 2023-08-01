import { Suspense, lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Loader from "./Pages/Loader/Loader";
import OrderPage from "./Pages/OrderPage/OrderPage";
import ForgotPasswordSuccessPage from "./Pages/ForgotPasswordSuccessPage/ForgotPasswordSuccessPage";
import ResetPasswordSuccessPage from "./Pages/ResetPasswordSuccessPage/ResetPasswordSuccessPage";

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
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/register-success/:email",
        element: (
          <Suspense fallback={<Loader />}>
            <RegistrationSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: "/reset-password/:token/:email",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPasswordPage />
          </Suspense>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/add-product",
        element: (
          <Suspense fallback={<Loader />}>
            <CreateProductPage />
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password/success/:email",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPasswordSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/reset-password/success",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPasswordSuccessPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
