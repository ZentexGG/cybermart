import { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { DecodedToken, UserDto } from "../../types";
import SignoutButton from "../SignoutButton/SignoutButton";
import axios from "axios";
import AdminDropdown from "../AdminDropdown/AdminDropdown";

export default function LoggedInUserDropdown({
  handleShowCart,
  userInfo,
}: {
  handleShowCart: () => void;
  userInfo: DecodedToken;
}) {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, SetUser] = useState<UserDto>();
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get<UserDto>(`/User/${userInfo.email}`);
      SetUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <button
        type="button"
        className="flex ml-5 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
        id="user-menu-button"
        aria-expanded={isUserDropdownOpen ? "true" : "false"}
        onClick={toggleUserDropdown}>
        <span className="sr-only">Open user menu</span>
        <img
          className="w-5 h-5 md:h-7 md:w-7 rounded-full"
          src={`data:image/jpeg;base64,${
            user
              ? user.imageData
                ? user.imageData
                : "iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAMFBMVEXk5ueutLersbTN0dPn6eq9wsTY29yzuLvKztC4vcCorrHFycve4eLR1NbU19nb3t90VuxHAAACvUlEQVRoge2Z3c6zIAyAKRRQRL3/u/3EzWXZHLRba/K94TlZspPH8ltaYzqdTqfT6XQ6nc7fBRHvv9eb8zz5seCHcOkHoBlishZu2GT9cpUes0+H+MDa4Qo9msm+qnc9LOp2DPFMveu9tnv+pC72uKq6h4q7sOoNPU4NN1g1ezPuYs9K7tB2byiFTlGDnTTs6EmBQ1LY77gkkhsgiruNGYlusE46dFxog64SOpID30KfhUNf6e4tdFk55Xx5QvaMx8hxWycqzxw3wCg67oy1vocuKWdOuez1Qj1aH/IgKWetN+GdzpYPknKeW/Ze/b/kosPOnXPJW5Vzp+1y0dXezJlf5KI3S+2hciaXdJvAckvnz7zAZdNn3uFuF0k3906VdRvD2OnijxbWZhN/pjMSKdkkqkAPXTSTOKC6NZ6p1XLMM/JqQ93r0nv8AWG76dQGCu0Vb71eOapl13QbzB/rj4WkNuZ3KqtONHM7BQc419uoWH582LM/KTtbUA/70L9UvW2CwVzWbEAz+2iTLSQYp/XaRkuxrYtzc8jmuqBv5lfd+z9a3uBKYynCPuoWYhz9NGwjoPsBiGHwMaX31X6f+0XpAxBXN9rT3s7TJ6Q4BHE/Zhc/HC5vHwCTpB/N4mnmwz/OQjtg29Mj76VW/FHk1MG5epF91sP06+BXenhtvXW/6Msd8q1618fwtR1nzjI710/fyn8L+wg+fxF8I2Ni6PndJuTWIj6TuGkG+XlCgZnLoxN0MzNq0bh3Oz12XIXd27zTS5LSaqB3WLm1TiKkzge31EmFVCyhtej5UB5TSoMOpIIss4PGkTd3O7enwCE11hynTc6mddSg13NDq1CVFQNvdT+EL5Q3qktOedQh1pZcZrawuFQbP7pT3ui3aR2tD3lls6G7VTr0qN0uwSkzV+a8FB5Uqbk7nU7nL/EPS0cfkCEZ18wAAAAASUVORK5CYII="
              : ""
          }`}
          alt="user photo"
        />
      </button>
      <div
        className={`${
          isUserDropdownOpen ? "block" : "hidden"
        } absolute  block right-0 origin-top-right w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 dark:bg-red-900 dark:divide-red-800 z-50`}
        id="user-dropdown"
        style={{ top: "calc(100% + 0.9rem)", right: "0" }}>
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            {userInfo.name}
          </span>
          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
            {userInfo.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href={`/user-settings`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white z-50">
              Settings
            </a>
          </li>
          <li>
            <a
              href={`/user-orders/`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Orders
            </a>
          </li>
          <SignoutButton />
          {userInfo.role === "Admin" && (
            <AdminDropdown />
          )}
        </ul>
      </div>
      <div className="ml-3">
        <BsCartCheckFill
          className="h-5 w-5 md:h-7 md:w-7 md:ml-2  "
          onClick={handleShowCart}
        />
      </div>
    </>
  );
}
