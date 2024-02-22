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
  const [isEditMode, SetIsEditMode] = useState<boolean>(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const fetchUser = async () => {
    const user = await checkAuth();
    console.log(user);
    if (!user) {
      navigate("/not-found");
    }
    let email: string = "";
    try {
      if (typeof user !== "boolean") {
        email = user.email;
      } else {
        navigate("/not-found");
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

    if (data.photo.length > 0) {
      formData.append("Photo", data.photo[0]);
    } else {
      formData.append("Photo", image as File);
    }

    try {
      const response = await axios.put("/User", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = response.data;
      console.log(responseData);
      fetchUser();
      SetIsEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Request Error:", error);
    }
  };

  return (
    <>
      {!isEditMode && (
        <div className="w-full flex justify-center mt-5 flex-col items-center">
          <img
            src={`data:image/jpeg;base64,${
              user?.imageData
                ? user.imageData
                : "iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAMFBMVEXk5ueutLersbTN0dPn6eq9wsTY29yzuLvKztC4vcCorrHFycve4eLR1NbU19nb3t90VuxHAAACvUlEQVRoge2Z3c6zIAyAKRRQRL3/u/3EzWXZHLRba/K94TlZspPH8ltaYzqdTqfT6XQ6nc7fBRHvv9eb8zz5seCHcOkHoBlishZu2GT9cpUes0+H+MDa4Qo9msm+qnc9LOp2DPFMveu9tnv+pC72uKq6h4q7sOoNPU4NN1g1ezPuYs9K7tB2byiFTlGDnTTs6EmBQ1LY77gkkhsgiruNGYlusE46dFxog64SOpID30KfhUNf6e4tdFk55Xx5QvaMx8hxWycqzxw3wCg67oy1vocuKWdOuez1Qj1aH/IgKWetN+GdzpYPknKeW/Ze/b/kosPOnXPJW5Vzp+1y0dXezJlf5KI3S+2hciaXdJvAckvnz7zAZdNn3uFuF0k3906VdRvD2OnijxbWZhN/pjMSKdkkqkAPXTSTOKC6NZ6p1XLMM/JqQ93r0nv8AWG76dQGCu0Vb71eOapl13QbzB/rj4WkNuZ3KqtONHM7BQc419uoWH582LM/KTtbUA/70L9UvW2CwVzWbEAz+2iTLSQYp/XaRkuxrYtzc8jmuqBv5lfd+z9a3uBKYynCPuoWYhz9NGwjoPsBiGHwMaX31X6f+0XpAxBXN9rT3s7TJ6Q4BHE/Zhc/HC5vHwCTpB/N4mnmwz/OQjtg29Mj76VW/FHk1MG5epF91sP06+BXenhtvXW/6Msd8q1618fwtR1nzjI710/fyn8L+wg+fxF8I2Ni6PndJuTWIj6TuGkG+XlCgZnLoxN0MzNq0bh3Oz12XIXd27zTS5LSaqB3WLm1TiKkzge31EmFVCyhtej5UB5TSoMOpIIss4PGkTd3O7enwCE11hynTc6mddSg13NDq1CVFQNvdT+EL5Q3qktOedQh1pZcZrawuFQbP7pT3ui3aR2tD3lls6G7VTr0qN0uwSkzV+a8FB5Uqbk7nU7nL/EPS0cfkCEZ18wAAAAASUVORK5CYII="
            }`}
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
                }
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
        <button onClick={() => navigate(`/user-orders/`)}>
          Orders
        </button>
      </div>
    </>
  );
}
