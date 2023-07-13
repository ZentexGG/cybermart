import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { MdScreenshotMonitor } from "react-icons/md";
import { DecodedToken } from "../../types";
import { checkAuth } from '../../authChecker';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}



export default function LoginFormComponent() {


    const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      let userInfo = await checkAuth();
      if (userInfo) {
        navigate("/")
      }
      fetchUserInfo();
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { rememberMe: false } });

  const [loading, setLoading] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const attemptLogin = async (data: FormData) => {
    try {
      setLoading(true);
      setIncorrectCredentials(false);
      const response = await axios.post(
        "/Auth/Login",
        data
      );
      const token = response.data.token;
      const decodedToken: DecodedToken = jwt_decode(token);
      document.cookie = `token=${token}; expires=${new Date(decodedToken.expires * 1000).toUTCString()}; path=/`;
      navigate("/")
    } catch (error) {
      setIncorrectCredentials(true);
    } finally {
      setLoading(false); 
    }
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
    attemptLogin(data);
  };

  return (
    <div className="h-max flex flex-col justify-center my-24 ">
      <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-row z-50">
        <MdScreenshotMonitor size={70} />
        <p>Cybermart</p>
      </div>
      <div className="max-w-md w-full mx-auto my-4 bg-white p-8 border border-gray-300 shadow-[10px_0px_100px_30px_#EBF8FF]">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-col">
            <AiOutlineLogin size={30} />
            <p>Login</p>
          </div>
          <div>
            <label
              htmlFor=""
              className={`text-sm font-bold block ${
                errors.email ? "text-red-500" : "text-gray-600"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded mt-1 focus:outline-none ${
                errors.email ? "focus:border-red-500" : "focus:border-blue-500"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor=""
              className={`text-sm font-bold block ${
                errors.password ? "text-red-500" : "text-gray-600"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded mt-1 focus:outline-none ${
                errors.password
                  ? "focus:border-red-500"
                  : "focus:border-blue-500"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-800 accent-red-700 rounded"
                id="rememberMe"
                {...register("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div>
              <a href="" className="font-medium text-sm text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              className="w-full py-2 px-4 bg-red-700 hover:bg-red-800 rounded-md text-white text-sm"
              type="submit"
              disabled={loading} // Disable the button when loading is true
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm9-1.646A7.962 7.962 0 0020 12h-4c0-3.042-1.135-5.824-3-7.938l-3 1.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
        <p className="text-red-500 flex justify-center">
          {!loading && incorrectCredentials
            ? "Incorrect username or password!"
            : ""}
        </p>
      </div>
    </div>
  );
}
