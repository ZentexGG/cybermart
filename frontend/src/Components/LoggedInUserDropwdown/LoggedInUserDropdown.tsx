import { useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { DecodedToken } from "../../types";
import SignoutButton from "../SignoutButton/SignoutButton";

export default function LoggedInUserDropdown({
  handleShowCart,
  userInfo,
}: {
  handleShowCart: () => void;
  userInfo: DecodedToken;
}) {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };
  console.log(userInfo);
  
  return (
    <>
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isUserDropdownOpen ? "true" : "false"}
        onClick={toggleUserDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
      </button>
      <div
        className={`${
          isUserDropdownOpen ? "block" : "hidden"
        } absolute right-0 origin-top-right w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 dark:bg-red-900 dark:divide-red-800`}
        id="user-dropdown"
        style={{ top: "calc(100% + 0.9rem)", right: "0" }}
      >
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
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
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
