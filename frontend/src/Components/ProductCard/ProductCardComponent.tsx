import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../authChecker";
import { CartItem, ProductDto } from "../../types";
import "./ProductCardComponent.css";

export default function ProductCardComponent({
  product,
  handleAddToCart,
  setShowAlert,
}: {
  product: ProductDto;
  handleAddToCart: (product: CartItem, amount: number) => void;
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
    handleAddToCart(cartProduct, 1);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col h-96 w-56 p-1 border-box bg-blue-200 rounded xl mt-5 line-clamp-2">
      <a href={`products/${product.id}`} className="block w-full h-48">
        <div className="flex rounded flex-col w-full h-full bg-gray-200 relative">
          <img
            src={`data:image/jpeg;base64,${
              product.photos && product.photos.length > 0
                ? product.photos[0].imageData
                : ""
            }`}
            className="absolute w-full h-full z-0 object-contain bg-white"
          />
        </div>
      </a>
      <div className="flex border-box p-1 flex-col h-48">
        <div className="flex-grow">
          <p className="text-sm text-gray-500">{product.categoryName}</p>
          <p className="line-clamp-2">{product.name}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg font-semibold text-red-800">
            €{product.price.toFixed(2)}
          </p>
          <button
            onClick={addToCart}
            className="text-center text-sm bg-red-800 rounded py-2 text-white w-full mt-2 mb-3">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
