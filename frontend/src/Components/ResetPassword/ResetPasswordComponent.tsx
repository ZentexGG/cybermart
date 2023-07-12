import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { MdScreenshotMonitor } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  token:string;
}

export default function ResetPasswordComponent() {
  const {
    register,
    handleSubmit,
      formState: { errors, isValid },
    watch
  } = useForm<FormData>({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [registrationError, setRegistrationError] = useState(false);
  const navigate = useNavigate();
  const {token} = useParams();

  const attemptRegister = async (data: FormData) => {

    var decoded = jwtDecode(token ?? '')
    console.log(decoded);
    
    try {
      setLoading(true);
      const response = await axios.post(
        "/Auth/register?role=User",
        {
          email: data.email,
          password: data.password,
          confirmPassword : data.confirmPassword,
        }
      );
      console.log(response.data.message);
      navigate(`/register-success/${data.email}`)
    } catch (error: any) {
      console.log(error);
      
      setRegistrationError(true);
      setStatusMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
    attemptRegister(data);
    };
    
    const password = watch("password");

  return (
    <div>
      <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-row z-50">
        <MdScreenshotMonitor size={70} />
        <p>Cybermart</p>
      </div>
      <div className="max-w-md w-full mx-auto my-4 bg-white p-8 border border-gray-300 shadow-[10px_0px_100px_30px_#EBF8FF]">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-col">
            <AiOutlineLogin size={30} />
            <p>Registration</p>
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
                pattern: {
                  value: /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Your password must be 8 characters long, contain a special character, a capital letter and a number!",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor=""
              className={`text-sm font-bold block ${
                errors.confirmPassword ? "text-red-500" : "text-gray-600"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className={`w-full p-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded mt-1 focus:outline-none ${
                errors.confirmPassword
                  ? "focus:border-red-500"
                  : "focus:border-blue-500"
              }`}
              {...register("confirmPassword", {
                  required: "Please confirm your password!",
                  validate: (value) => value === password || "The passwords do not match!"
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
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
          {!loading && registrationError
            ? statusMessage
            : ""}
        </p>
      </div>
    </div>
  );
}
