import { useState } from "react";
import CybermartLogo from "../../Img/cybermart-low-resolution-logo-color-on-transparent-background.png";

import LoggedInUserDropdown from "../LoggedInUserDropwdown/LoggedInUserDropdown";
import { DecodedToken } from "../../types";
import NotLoggedInUserDropdown from "../NotLoggedInUserDropdown/NotLoggedInUserDropdown";

export default function NavbarComponent({
  handleShowCart,
  userInfo,
}: {
  handleShowCart: () => void;
  userInfo: DecodedToken | boolean;
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-blue-100 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src={CybermartLogo} className="h-8 mr-2" alt="Cybermart Logo" />
        </a>
        <div className="flex items-center md:order-2 relative group z-10">
          {userInfo && typeof userInfo !== "boolean" ? (
            <LoggedInUserDropdown
              handleShowCart={handleShowCart}
              userInfo={userInfo}
            />
          ) : (
            <NotLoggedInUserDropdown />
          )}

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            onClick={toggleMobileMenu}>
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } items-center justify-evenly w-full md:flex md:w-auto md:order-1 bg-blue-100`}
          id="mobile-menu-2">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-100 md:dark:bg-blue-100 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-900"
                aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-red-900 md:dark:hover:text-blue-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700">
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-100 md:hover:bg-transparent md:hover:text-blue-100 md:p-0 dark:text-red-900 md:dark:hover:text-blue-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
