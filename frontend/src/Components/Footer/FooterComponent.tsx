import React from "react";
import CybermartLogo from "../../Img/cybermart-low-resolution-logo-color-on-transparent-background.png";

export default function FooterComponent() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-blue-100">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img
              src={CybermartLogo}
              className="h-8 mr-3"
              alt="Cybermart Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-red-900">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-red-900">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Cybermart™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
