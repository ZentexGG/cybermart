import { useEffect, useState } from "react";
import CybermartLogo from "../../Img/cybermart-low-resolution-logo-color-on-transparent-background.png";

import LoggedInUserDropdown from "../LoggedInUserDropwdown/LoggedInUserDropdown";
import { DecodedToken, ProductDto } from "../../types";
import NotLoggedInUserDropdown from "../NotLoggedInUserDropdown/NotLoggedInUserDropdown";
import SearchBarComponent from "../SearchBar/SearchBarComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent({
  handleShowCart,
  userInfo,
}: {
  handleShowCart: () => void;
  userInfo: DecodedToken | boolean;
}) {
  const navigate = useNavigate();
  const [matchedProducts, setMatchedProducts] = useState<ProductDto[] | null>();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
    window.location.reload();
  };
  const handleSearchProducts = async (name: string) => {
    if (name.length < 3) {
      setMatchedProducts(null);
      return;
    }
    try {
      const response = await axios.get(`/api/products/search/${name}`);
      const matched = response.data; // Assuming the API returns an array of ProductDto objects
      setMatchedProducts(matched);
      console.log(matched);
    } catch (error) {
      console.error("Error fetching matched products:", error);
      setMatchedProducts(null);
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-blue-100 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img
              src={CybermartLogo}
              className="h-8 mr-2"
              alt="Cybermart Logo"
            />
          </a>

          <div
            id="search-bar"
            className="md:flex lg:flex w-full md:w-1/4 justify-center flex-col-reverse overflow-hidden relative hidden"
          >
            <SearchBarComponent handleSearch={handleSearchProducts} />
          </div>

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
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } items-center justify-evenly w-full md:flex md:w-auto md:order-1 bg-blue-100`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-100 md:dark:bg-blue-100 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-red-900 md:dark:hover:text-blue-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-red-900 md:dark:hover:text-blue-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700"
                >
                  Products
                </a>
              </li>
              <li>
                <div
                  id="search-bar"
                  className="md:hidden lg:hidden w-full md:w-1/4 justify-center flex-col-reverse overflow-hidden relative"
                >
                  <SearchBarComponent handleSearch={handleSearchProducts} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {matchedProducts && (
        <div className="lg:w-1/3 md:w-1/3 md:left-48 lg:left-96 w-full md:mt-4 absolute z-50">
          {/* Add the following classes for responsive positioning */}
          <div className="z-10 top-full md:w-full lg:w-full bg-white p-4 md:-mt-4">
            {matchedProducts.map((product: ProductDto) => (
              <div
                key={product.id}
                className="flex items-center w-full mb-2 border-b-2 border-black cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={`data:image/jpeg;base64,${product.photos[0].imageData}`}
                  alt=""
                  className="w-16 h-16"
                />
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p>{product.name}</p>
                    <p>Category: {product.categoryName}</p>
                  </div>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
