import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DecodedToken, UserDto } from "../../types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutContext } from "../../Pages/Layout/Layout";
import { checkAuth } from "../../authChecker";

interface FormData {
  userDto: UserDto;
  photo: FileList;
}
export default function UserProfileComponent(): JSX.Element {
  const [image, setImage] = useState<File>();
  const [isEditMode, SetIsEditMode] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const fetchUser = async () => {
    const user = await checkAuth()
    console.log(user)
    let email;
    try {
      if (typeof user !== "boolean") {
        email = user.email;
      }
      else{
        navigate("/")
      }
      const response = await axios.get<UserDto>(`/User/${email}`);
      setUser(response.data);
      if (response.data.imageData) {
        const byteCharacters = atob(response.data.imageData);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: "image/jpeg" });
        const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
        setImage(file);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    console.log(data.photo);
    if (user && user.id !== null) {
      formData.append("UserDto.Id", user?.id.toString());
    }
    formData.append("UserDto.Username", data.userDto.username);
    formData.append("UserDto.Email", data.userDto.email);

    // Append the first file from the FileList to the FormData
    if (data.photo.length > 0) {
      formData.append("Photo", data.photo[0]);
    } else {
      formData.append("Photo", image as File);
    }

    try {
      const response = await axios.put(
        "/User",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response
      const responseData = response.data;
      console.log(responseData);
      fetchUser();
      SetIsEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Request Error:", error);
      // Handle error
    }
  };

  return (
    <>
      {user?.id}
      {!isEditMode && (
        <div className="w-full flex justify-center mt-5 flex-col items-center">
          <img
            src={`data:image/jpeg;base64,${user?.imageData}`}
            className="w-40 h-40 rounded-full"
          />
          <p className="text-3xl">{user?.username}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
      )}
      {isEditMode && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mt-5 flex-col items-center">
            <div className="w-40 h-40 relative">
              <input
                type="file"
                id="photo"
                className="hidden"
                {...register("photo")}
                onInput={(element) => {
                  setImage(element.currentTarget.files?.[0] as File);
                }}
              />
              <label
                htmlFor="photo"
                className={
                  "w-full h-full inset-0 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm5-9a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0zm6 5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              {image && (
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `data:image/jpeg;base64,${user?.imageData}`
                  }
                  alt=""
                  className="absolute inset-0 w-full h-full bg-gray-200 rounded-full flex items-center justify-center pointer-events-none z-50"
                  {...register("photo")}
                />
              )}
            </div>
            <input
              type="email"
              defaultValue={user?.email}
              {...register("userDto.email")}
            />
            <input
              type="text"
              defaultValue={user?.username}
              {...register("userDto.username")}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      <div className="w-full flex justify-center flex-col items-center mt-10">
        <button onClick={() => SetIsEditMode(true)}>Change</button>
        <button onClick={()=>navigate(`/UserOrders/${user?.id}`)}>Orders</button>
      </div>
    </>
  );
}
