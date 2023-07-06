import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { MdScreenshotMonitor} from "react-icons/md"

interface FormData {
  email: string;
  password: string;
}

export default function LoginFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data); // You can access the form data here
  };

  return (
    <div className="h-max flex flex-col justify-center my-24 ">
      <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-row z-50">
        <MdScreenshotMonitor size={70}/>
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
              }`}>
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
              }`}>
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
                className="h-4 w-4 text-blue-300 rounded"
              />
              <label htmlFor="" className="ml-2 text-sm text-gray-600">
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
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
              type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
