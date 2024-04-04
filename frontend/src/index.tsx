import { Suspense, lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Loader from "./Pages/Loader/Loader";
import OrderPage from "./Pages/OrderPage/OrderPage";
import ForgotPasswordSuccessPage from "./Pages/ForgotPasswordSuccessPage/ForgotPasswordSuccessPage";
import ResetPasswordSuccessPage from "./Pages/ResetPasswordSuccessPage/ResetPasswordSuccessPage";
import TitleUpdater from "./Components/TitleUpdater/TitleUpdater";
import EmailVerifiedSuccessPage from "./Pages/EmailVerifiedSuccessPage/EmailVerifiedSuccessPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserOrdersPage from "./Pages/UserOrdersPage/UserOrdersPage";
import EditProductPage from "./Pages/EditProductPage/EditProductPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import NotFoundRedirect from "./Components/NotFoundRedirect/NotFoundRedirect";

const stripePromise = loadStripe(
  "pk_test_51NU9A1E7blOkcXvgDUiJx1JqdDeJIc6WvY9stEMjNxzTJW60w50hxvJNjjSoQbnwNhQNRjskhfnnHDbfRTyJz9tX00q8g4aLCb"
);
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
            <TitleUpdater title="Cybermart - Login" />
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Cybermart - Products" />
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Cybermart - Register" />
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/register-success/:email",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Registration Successful" />
            <RegistrationSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Cybermart - Reset Password" />
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: "/reset-password/:token/:email",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Cybermart - Reset Password" />
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
        path: "/user-settings",
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
            <TitleUpdater title="Cybermart - Create Product" />
            <CreateProductPage />
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Cybermart - Order" />
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password/success/:email",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Email Sent!" />
            <ForgotPasswordSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/reset-password/success",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Password Reset!" />
            <ResetPasswordSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/email-verified",
        element: (
          <Suspense fallback={<Loader />}>
            <TitleUpdater title="Email Verified!" />
            <EmailVerifiedSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Elements stripe={stripePromise}>
            <Suspense fallback={<Loader />}>
              <PaymentPage />
            </Suspense>
          </Elements>
        ),
      },
      {
        path: "/user-orders/",
        element: (
          <Suspense fallback={<Loader />}>
            <UserOrdersPage />
          </Suspense>
        ),
      },
      {
        path: "/edit-product/:productId",
        element: (
          <Suspense fallback={<Loader />}>
            <EditProductPage />
          </Suspense>
        ),
      },
      {
        path: "/edit-product",
        element: (
          <Suspense fallback={<Loader />}>
            <EditProductPage />
          </Suspense>
        )
      },
      {
        path: "/not-found",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundRedirect />
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
