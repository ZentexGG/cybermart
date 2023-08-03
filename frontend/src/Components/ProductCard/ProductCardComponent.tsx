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
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-100 dark:border-blue-200">
      <a href={`products/${product.id}`}>
        <img
          className="rounded-t-lg h-80 w-full"
          src={`data:image/jpeg;base64,${
            product.photos && product.photos.length > 0
              ? product.photos[0].imageData
              : ""
          }`}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href={`products/${product.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-black">
            €{product.price}
          </span>
          <button
            onClick={addToCart}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
