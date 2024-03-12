import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem, ProductDto, ProductPhotoDto } from "../../types";
import Loader from "../../Pages/Loader/Loader";
import { LayoutContext } from "../../Pages/Layout/Layout";
import { checkAuth } from "../../authChecker";

const ProductDetailsComponent = () => {
  const { handleAddToCart } = useContext(LayoutContext);

  const [product, setProduct] = useState<ProductDto>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (product?.photos && product.photos.length > 0) {
      setActiveIndex(0);
    }
  }, [product]);

  const handleNextImage = () => {
    if (product?.photos.length) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % product.photos.length);
    }
  };

  const handlePrevImage = () => {
    if (product?.photos.length) {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.photos.length) % product.photos.length
      );
    }
  };

  const [amount, setAmount] = useState(1);
  const addToCart = async () => {
    const loggedIn = await checkAuth();
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    if (!product) return;
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
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col w-full lg:w-1/2 border-black mt-10 items-center">
              <div className="relative w-full h-96 aspect-square rounded-xl overflow-hidden bg-white">
                {product?.photos.map((photo, index) => (
                  <img
                    key={photo.Id}
                    src={`data:image/jpeg;base64,${photo.imageData}`}
                    alt=""
                    className={`absolute w-full h-full object-contain transition-opacity ${
                      index === activeIndex
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  />
                ))}
                <button
                  className="w-8 h-8 bg-gray-200 rounded-full absolute top-1/2 transform -translate-y-4 left-4"
                  onClick={handlePrevImage}>
                  {/* Add left arrow icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mx-auto">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 bg-gray-200 rounded-full absolute top-1/2 transform -translate-y-4 right-4"
                  onClick={handleNextImage}>
                  {/* Add right arrow icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mx-auto">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="lg:hidden flex flex-row h-24 mt-4 overflow-x-auto">
                {product?.photos.map((image: ProductPhotoDto) => (
                  <div
                    key={image.Id}
                    className="w-8 h-8 rounded-full mx-1"
                    style={{
                      backgroundImage: `url(data:image/jpeg;base64,${image.imageData})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </div>
              <div className="hidden lg:flex flex-row h-24 mt-4 gap-1">
                {product?.photos.map(
                  (image: ProductPhotoDto, index: number) => (
                    <img
                      key={image.Id}
                      src={`data:image/jpeg;base64,${image.imageData}`}
                      alt=""
                      className={`w-12 h-12 cursor-pointer ${
                        index === activeIndex
                          ? "border-2 border-blue-500"
                          : "border"
                      }`}
                      onClick={() => setActiveIndex(index)}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:w-1/2 items-center lg:mt-12 md:-mt-10">
              <div className="flex flex-col items-center">
                <span className="text-red-800  text-2xl font-semibold">
                  {product?.categoryName}
                </span>
                <h1 className="text-4xl font-bold">{product?.name}</h1>
              </div>
              <p className="text-gray-700 text-xl">{product?.description}</p>
              <h6 className="text-4xl font-bold text-center lg:text-left">
                {product?.price}€
              </h6>
              <div className="flex flex-col items-center lg:flex-col gap-12">
                <div className="flex flex-row items-center">
                  <button
                    className="bg-blue-200 py-2 px-5 rounded-lg text-red-800 text-3xl"
                    onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}>
                    -
                  </button>
                  <span className="py-4 px-6 font-bold text-2xl rounded-lg">
                    {amount}
                  </span>
                  <button
                    className="bg-blue-200 py-2 px-4 rounded-lg text-red-800 text-3xl"
                    onClick={() => setAmount((prev) => prev + 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="bg-blue-200 text-red-800 font-semibold py-3 px-16 rounded-xl h-full">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <p className="text-3xl">Product Specifications</p>
            <div className="overflow-x-auto mt-8 pb-12">
              <table className="w-full table-fixed border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="w-1/2 px-4 py-2 bg-blue-200 font-semibold text-left">
                      Specification
                    </th>
                    <th className="w-1/2 px-4 py-2 bg-blue-200 font-semibold text-left">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product?.specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "" : "bg-blue-100"}>
                      <td className="w-1/2 px-4 py-2">
                        {spec.specificationTypeName}
                      </td>
                      <td className="w-1/2 px-4 py-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsComponent;
