import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCardComponent from "../../Components/ProductCard/ProductCardComponent";
import PaginationComponent from "../../Components/Pagination/PaginationComponent";
import { ProductCountResponse, ProductDto } from "../../types";
import { LayoutContext } from "../Layout/Layout";
import Loader from "../Loader/Loader";
import { AiFillCheckSquare } from "react-icons/ai";
import AlertSuccess from "../../Components/AlertSuccess/AlertSuccess";

export default function ProductsPage() {
  // Change this to have more products per page : 20 is the default
  const productsPerPageLimit: number = 20;
  const [num, setNum] = useState(1);
  const [products, setProducts] = useState<ProductDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);

  const { handleAddToCart } = useContext(LayoutContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productCountResp = await axios.get<ProductCountResponse>(
          "/api/products/count"
        );
        const productsResp = await axios.get(
          `/api/products/page/${num}?limit=${productsPerPageLimit}`
        );
        setTotalProductsCount(productCountResp.data.products);
        setProducts(productsResp.data);
      } catch (error) {
        console.error(error);
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
        <AlertSuccess
          message="Successfully added product to cart!"
        />
      )}
      <div className="grid max-w-screen justify-center items-center place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-5">
        {products?.map((product: ProductDto) => (
          <ProductCardComponent
            handleAddToCart={handleAddToCart}
            key={product.id}
            product={product}
            setShowAlert={setShowAlert}
          />
        ))}
      </div>
      <PaginationComponent
        num={num}
        setNum={setNum}
        totalProducts={totalProductsCount}
        productsPerPageLimit={productsPerPageLimit}
      />
    </>
  );
}
