import { DecodedToken } from "../../types";
import LoggedInUserDropdown from "../LoggedInUserDropwdown/LoggedInUserDropdown";

export default function AdminDropdown() {
  return (
    <>
      <li>
        <h1 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
          <hr />
          ADMINISTRATIVE PAGES
          <hr />
        </h1>
      </li>
      <li>
        <a
          href={`/add-product`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Add Product
        </a>
      </li>

      <li>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Edit Product (WIP)
        </a>
      </li>
    </>
  );
}
