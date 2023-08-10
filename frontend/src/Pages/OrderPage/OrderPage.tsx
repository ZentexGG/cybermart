import React, { useContext } from "react";
import OrderFormComponent from "../../Components/OrderForm/OrderFormComponent";
import useLocalStorageState from "use-local-storage-state";
import { CartItem } from "../../types";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LayoutContext } from "../Layout/Layout";

export default function OrderPage() {
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>("cart", {
    storageSync: true,
    defaultValue: [],
  });
  const { handleRemoveFromCart } = useContext(LayoutContext);
  console.log(cartItems);
  return (
    <div className="flex flex-row justify-evenly w-full">
      <OrderFormComponent />
      <div className="h-max flex flex-col justify-center my-32">
        <div className="flex justify-center items-center text-3xl font-bold text-gray-900 text-center flex-row z-50 min-w-max">
          <AiOutlineShoppingCart size={40} />
          <p>CartItems</p>
        </div>
        <div className="max-w-md w-full mx-auto my-4 bg-white p-8 border border-gray-300 shadow-[10px_0px_100px_30px_#EBF8FF]">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <img src={item.img} alt="" className="w-20 h-20" />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 whitespace-nowrap">Quantity: {item.amount}</td>
                  <td className="p-2">
                    <button className="px-3 py-1 hover:bg-red-500 hover:text-white text-black rounded" onClick={()=>{handleRemoveFromCart(item.id)}}>
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
