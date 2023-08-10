import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../authChecker";
import { CartItem, ProductDto } from "../../types";
import { useState } from "react";

export default function ProductCardComponent({
  product,
  handleAddToCart,
  setShowAlert,
}: {
  product: ProductDto;
  handleAddToCart: (product: CartItem) => void;
  setShowAlert: (showAlert: boolean) => void;
}) {
  const navigate = useNavigate();

  const addToCart = async () => {
    const loggedIn = await checkAuth();
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    const image: string = `data:image/jpeg;base64,${
      product.photos && product.photos.length > 0
        ? product.photos[0].imageData
        : ""
    }`;
    const cartProduct: CartItem = {
      id: `${product.id}`,
      img: image,
      name: product.name,
      price: product.price,
      amount: 1,
    };
    handleAddToCart(cartProduct);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col h-min w-56 p-1 border-box bg-blue-200 rounded xl mt-5">
      <div className="flex rounded flex-col w-full h-48 bg-gray-200 relative">
        <br />
        <div className="bg-red-500 text-white w-1/4 text-center rounded-r-xl z-10">
          NEW
        </div>
        <img
          src={`data:image/jpeg;base64,${
            product.photos && product.photos.length > 0
              ? product.photos[0].imageData
              : ""
          }`}
          className="absolute h-full z-0"
        />

      </div>
      <div className="flex border-box p-1 flex-col">
        <p className="text-sm text-gray-500">{product.categoryName}</p>
        <p>{product.name}</p>
        <p>
          ${product.price}.<span className="text-sm">00</span>
        </p>
        <button
          onClick={addToCart}
          className="text-center text-sm bg-red-800 rounded py-2 text-white mt-2">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
