import { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { DecodedToken, UserDto } from "../../types";
import SignoutButton from "../SignoutButton/SignoutButton";
import axios from "axios";

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
      const response = await axios.get<UserDto>(
        `/User/${userInfo.email}`
      );
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
        className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
        id="user-menu-button"
        aria-expanded={isUserDropdownOpen ? "true" : "false"}
        onClick={toggleUserDropdown}>
        <span className="sr-only">Open user menu</span>
        <img
          className="w-9 h-9 rounded-full"
          src={`data:image/jpeg;base64,${user ? user.imageData : ""}`}
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
              href={`/users/${userInfo.id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white z-50">
              Settings
            </a>
          </li>
          <li>
            <a
              href={`/UserOrders/${user?.id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Orders
            </a>
          </li>
          <SignoutButton />
        </ul>
      </div>
      <div className="ml-5">
        <BsCartCheckFill size={25} onClick={handleShowCart} />
      </div>
    </>
  );
}
