import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductDto } from "../../types";

const ProductDetailsComponent = () => {
  const [product, setProduct] = useState<ProductDto>();
  const { id } = useParams();

  const [activeImg, setActiveImage] = useState<string>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        console.log(response.data)
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  },[]);
  useEffect(() => {
    if (product?.photos && product.photos.length > 0) {
      setActiveImage(`data:image/jpeg;base64,${product.photos[0].imageData}`);
    }
  }, [product]);

  const handleChangeImage = (imageData: ArrayBuffer) => {
    setActiveImage(`data:image/jpeg;base64,${imageData}`);
  };

  const [amount, setAmount] = useState(1);
  
  return (
    <div>
      <div className="flex flex-row justify-between lg:flex-row lg:items-center">
        <div className="flex flex-col lg: w-1/2 border-black mt-10 items-center">
          <img
            src={activeImg}
            alt=""
            className=" w-96 h-96 aspect-square object-cover rounded-xl"
          />
          <div className="flex flex-row h-24 mt-4">
            {product?.photos.map((image) => {
              if (image.imageData.toString() == activeImg?.split(",")[1])
                return null;
              return (
                <img
                  src={`data:image/jpeg;base64,${image.imageData}`}
                  alt=""
                  className="w-24 h-24 rounded-md cursor-pointer mx-4"
                  onClick={() => handleChangeImage(image.imageData)}
                  key={image.Id} // Add key prop
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className=" text-violet-600 font-semibold">
              {product?.categoryName}
            </span>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
          </div>
          <p className="text-gray-700">{product?.description}</p>
          <h6 className="text-2xl font-semibold text-center sm:text-left">
            {product?.price}€
          </h6>
          <div className="flex flex-col items-center gap-12 sm:flex-row">
            <div className="flex flex-row items-start ">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev - 1)}
              >
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between lg:flex-col gap-16 lg:items-start m-4 text-3xl">
        <p>Product Specifications</p>
        <div className="m-5">
          <table>
            <thead>
              <tr>
                <th>Product Specifications</th>
              </tr>
            </thead>
            <tbody>
              {product?.specifications.map((spec, index) => (
                <tr key={index}>
                  <td>{spec.specificationTypeName}</td>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsComponent;
