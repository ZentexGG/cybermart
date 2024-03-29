import React, { useRef } from "react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
}
interface CartProps {
  setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartItem[];
  handleAddToCart: (item: CartItem, amount: number) => void;
  handleRemoveFromCart: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({
  setIsShowCart,
  cart,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null);

  const total = (arr: CartItem[]) => {
    return arr.reduce((cal, item) => {
      return cal + item.price * item.amount;
    }, 0);
  };

  const DollarUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const handleCloseCart = () => {
    if (cartRef.current) {
      cartRef.current.classList.remove("animate-fade-in");
      cartRef.current.classList.add("animate-fade-out");
      setTimeout(() => {
        setIsShowCart(false);
      }, 150);
    }
  };

  const handleCheckOut = async () => {
    handleCloseCart(); // Close the cart
    navigate("/Order"); // Navigate to the "/Order" route
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50"
      onClick={handleCloseCart}>
      <div
        ref={cartRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[275px] absolute right-0 h-full">
        <h1 className="bg-blue-100 py-2 text-center text-red-700 font-medium">
          Shopping Cart
        </h1>
        <div className="flex flex-col items-center px-2 py-4">
          {cart.length === 0 ? (
            <p className="text-center text-red-700 font-normal">
              Your cart is empty!
              <br /> Start adding products to your cart and they will show up
              here.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="text-center border-b-[3px] w-full mb-2 flex flex-col items-center">
                <img
                  className="w-[100px] h-[100px]"
                  src={item.img}
                  alt={item.name}
                />
                <p className="text-white font-bold w-6 h-6 rounded-full bg-blue-700">
                  {item.amount}
                </p>
                <h3 className="text-[0.8rem]">{item.name}</h3>
                <div className="flex items-center my-2">
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    <AiOutlineMinusSquare className="text-[30px] text-gray-500" />
                  </button>
                  <p className="text-red-600 mx-2">
                    {DollarUsd.format(item.price)}
                  </p>
                  <button onClick={() => handleAddToCart(item, 1)}>
                    <AiOutlinePlusSquare className="text-[30px] text-gray-500" />
                  </button>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && <p>Total: {DollarUsd.format(total(cart))}</p>}
        </div>
        <div className="w-full h-12 bottom-0 absolute flex justify-center">
          <button
            onClick={handleCheckOut}
            className="w-full bg-red-700 hover:bg-red-800 text-white text-sm">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
