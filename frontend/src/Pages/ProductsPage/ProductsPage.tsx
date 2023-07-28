import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCardComponent from "../../Components/ProductCard/ProductCardComponent";
import PaginationComponent from "../../Components/Pagination/PaginationComponent";
import { ProductDto } from "../../types";
import { LayoutContext } from "../Layout/Layout";
import Loader from "../Loader/Loader";
import { AiFillCheckSquare } from "react-icons/ai";

export default function ProductsPage() {
  const [num, setNum] = useState(1);
  const [products, setProducts] = useState<ProductDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { handleAddToCart } = useContext(LayoutContext);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/products/page/${num}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [num]);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      {showAlert && (
        <div className="fixed left-1/2 transform -translate-x-1/2">
          <div
            className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 animate-fade-in-down-out w-96"
            role="alert"
          >
            <AiFillCheckSquare size={30} color="light-green" className="" />
            <p className="ml-12">Successfully added product to cart!</p>
          </div>
        </div>
      )}
      <div className="grid max-w-screen justify-center items-center place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 my-5">
        {products?.map((product: ProductDto) => (
          <ProductCardComponent
            handleAddToCart={handleAddToCart}
            key={product.id}
            product={product}
            setShowAlert={setShowAlert}
          />
        ))}
      </div>
      <PaginationComponent num={num} setNum={setNum} />
    </>
  );
}
