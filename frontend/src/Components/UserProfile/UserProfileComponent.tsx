import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface UserDto {
  id: number;
  username: string;
  email: string;
  imageData?: string;
  fileName?: string;
  // Other properties as needed
}

interface FormData {
  userDto: UserDto;
  photo: FileList;
}

export default function UserProfileComponent(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const [user, setUser] = useState<UserDto | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserDto>(
          "/User/alexandrudanielaka47@gmail.com"
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data.userDto);
    console.log(data.photo[0]);
  };

  const handleImageClick = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center w-full h-full items-center">
        <h2 className="text-3xl">User Profile</h2>
        {user && (
          <>
            <div className="relative">
              {user.imageData && (
                <img
                  src={`data:image/jpeg;base64,${user.imageData}`}
                  alt="User Photo"
                  className={`rounded-full h-64 w-64 cursor-pointer ${
                    isEditMode ? "pointer-events-none" : ""
                  }`}
                  onClick={handleImageClick}
                />
              )}
              {isEditMode && (
                <label
                  htmlFor="photo"
                  className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm5-9a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0zm6 5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    id="photo"
                    className="hidden"
                    {...register("photo")}
                  />
                </label>
              )}
              {!user.imageData && !isEditMode && (
                <label
                  htmlFor="photo"
                  className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm5-9a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0zm6 5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    id="photo"
                    className="hidden"
                    {...register("photo")}
                  />
                </label>
              )}
            </div>
            <div>
              <label htmlFor="username" className="text-sm font-bold block">
                Username
              </label>
              <input
                type="text"
                id="username"
                className={`w-full p-2 border ${
                  !isEditMode ? "bg-gray-200 pointer-events-none" : ""
                }`}
                {...register("userDto.username", {
                  required: "Username is required",
                })}
                defaultValue={user.username}
                disabled={!isEditMode} // Disable the input when not in edit mode
              />
              {errors.userDto?.username && (
                <span className="text-red-500 text-sm">
                  {errors.userDto.username.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-2 border ${
                  !isEditMode ? "bg-gray-200 pointer-events-none" : ""
                }`}
                {...register("userDto.email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                defaultValue={user.email}
                disabled={!isEditMode} // Disable the input when not in edit mode
              />
              {errors.userDto?.email && (
                <span className="text-red-500 text-sm">
                  {errors.userDto.email.message}
                </span>
              )}
            </div>
            {isEditMode && (
              <div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                >
                  Save
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </form>
  );
}
