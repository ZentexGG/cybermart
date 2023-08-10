import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BiSolidTruck } from "react-icons/bi";
import { MdScreenshotMonitor } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CartItem, DecodedToken, Order } from "../../types";
import useLocalStorageState from "use-local-storage-state";
import { checkAuth } from "../../authChecker";
import { LayoutContext } from "../../Pages/Layout/Layout";

export default function OrderFormComponent() {
  const navigate = useNavigate();
  const [cardPayment, setCardPayment] = useState<boolean>(true);
  const {userInfo} = useContext(LayoutContext)
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>("cart", {
    storageSync: true,
    defaultValue: [],
  });
 // State to handle cardPayment selection
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>();

  const [loading, setLoading] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const saveOrder = async (data: Order) => {
    try {
      setLoading(true);
      setIncorrectCredentials(false);
      data.cardPayment=cardPayment
      data.orderProducts = cartItems.map((e) => ({
        productId: e.id as unknown as number,
        amount:e.amount as unknown as number
      }));
      if (typeof userInfo === "object" && userInfo !== null) {
        data.userId = userInfo.id;
      }   
      await axios.post("/api/orders", data);
      if(data.cardPayment)
      {
        navigate("/payment")
        return;
      }
      navigate('/')
    } catch (error) {
      setIncorrectCredentials(true);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: Order) => {
    saveOrder(data);
  };

  return (
    <div className="h-max flex flex-col justify-center my-24">
      <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-row z-50">
        <MdScreenshotMonitor size={70} />
        <p>Cybermart</p>
      </div>
      <div className="max-w-md w-full mx-auto my-4 bg-white p-8 border border-gray-300 shadow-[10px_0px_100px_30px_#EBF8FF]">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-col">
            <BiSolidTruck size={30} />
            <p>Order</p>
          </div>
          <div className="flex-row flex flex-wrap w-full justify-between">
            <div className="w-full lg:w-1/2 lg:pr-2">
              <label
                htmlFor="firstName"
                className={`text-sm font-bold block ${
                  errors.firstName ? "text-red-500" : "text-gray-600"
                }`}>
                First Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.firstName
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: 4,
                })}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="w-full  lg:w-1/2 lg:pl-2">
              <label
                htmlFor="Last name"
                className={`text-sm font-bold block ${
                  errors.lastName ? "text-red-500" : "text-gray-600"
                }`}>
                Last Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.lastName
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: 4,
                })}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div className="w-full  lg:w-1/2 lg:pr-2">
              <label
                htmlFor="country"
                className={`text-sm font-bold block ${
                  errors.country ? "text-red-500" : "text-gray-600"
                }`}>
                Country
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.country
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                {...register("country", {
                  required: "Country is required",
                })}
              />
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>
            <div className="w-full  lg:w-1/2 lg:pl-2">
              <label
                htmlFor="city"
                className={`text-sm font-bold block ${
                  errors.city ? "text-red-500" : "text-gray-600"
                }`}>
                City
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.city ? "focus:border-red-500" : "focus:border-blue-500"
                }`}
                {...register("city", {
                  required: "City is required",
                })}
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div className="w-full  lg:w-1/2 lg:pr-2">
              <label
                htmlFor="region"
                className={`text-sm font-bold block ${
                  errors.region ? "text-red-500" : "text-gray-600"
                }`}>
                Region
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.region ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.region
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                {...register("region", {
                  required: "Region is required",
                })}
              />
              {errors.region && (
                <p className="text-red-500">{errors.region.message}</p>
              )}
            </div>
            <div className="w-full  lg:w-1/2 lg:pl-2">
              <label
                htmlFor="phoneNumber"
                className={`text-sm font-bold block ${
                  errors.phoneNumber ? "text-red-500" : "text-gray-600"
                }`}>
                Phone Number
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.phoneNumber
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className={`text-sm font-bold block ${
                  errors.address ? "text-red-500" : "text-gray-600"
                }`}>
                Address
              </label>
              <input
                type="text"
                className={`w-full p-2 border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded mt-1 focus:outline-none ${
                  errors.address
                    ? "focus:border-red-500"
                    : "focus:border-blue-500"
                }`}
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="w-full justify-center items-center">
              <label
                htmlFor="address"
                className={`text-sm font-bold block ${
                  errors.address ? "text-red-500" : "text-gray-600"
                }`}>
                Payment
              </label>
              <div className="flex justify-evenly flex-col mt-1">
                <div className="flex flex-row">
                  <input
                    type="radio"
                    className={`mr-1 my-1 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded mt-1 focus:outline-none ${
                      errors.address
                        ? "focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                    checked={cardPayment}
                    onChange={() => setCardPayment(true)}
                  />
                  <label
                    htmlFor="address"
                    className={`text-sm font-semibold block ${
                      errors.address ? "text-red-500" : "text-gray-600"
                    }`}>
                    Card
                  </label>
                </div>
                <div className="flex flex-row">
                  <input
                    type="radio"
                    className={`my-1 border ${
                      errors.cardPayment ? "border-red-500" : "border-gray-300"
                    } rounded mr-1 focus:outline-none ${
                      errors.cardPayment
                        ? "focus:border-red-500"
                        : "focus:border-blue-500"
                    }`}
                    checked={!cardPayment}
                    onChange={() => setCardPayment(false)}
                  />
                  <label
                    htmlFor="address"
                    className={`text-sm font-semibold block flex-wrap ${
                      errors.cardPayment ? "text-red-500" : "text-gray-600"
                    }`}>
                    Cash at delivery (+5$)
                  </label>
                </div>
              </div>
              {errors.cardPayment && (
                <p className="text-red-500 w-full text-center mt-3 pr-10">
                  {errors.cardPayment.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <button
                className="w-full py-2 px-4 mt-6 bg-red-700 hover:bg-red-800 rounded-md text-white text-sm"
                type="submit"
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm9-1.646A7.962 7.962 0 0020 12h-4c0-3.042-1.135-5.824-3-7.938l-3 1.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </div>
        </form>
        <p className="text-red-500 flex justify-center">
          {!loading && incorrectCredentials
            ? "Incorrect username or password!"
            : ""}
        </p>
      </div>
    </div>
  );
}
