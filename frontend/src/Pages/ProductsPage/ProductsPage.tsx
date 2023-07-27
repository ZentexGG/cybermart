import { useState, useEffect } from "react";
import axios from "axios";
import ProductCardComponent from "../../Components/ProductCard/ProductCardComponent";
import PaginationComponent from "../../Components/Pagination/PaginationComponent";
import { ProductDto } from "../../types";

export default function ProductsPage() {
  const [num, setNum] = useState(1);
  const [products, setProducts] = useState<ProductDto[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/page/${num}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [num]);
  return (
    <>
      <div className="grid max-w-screen justify-center items-center place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 my-5">
        {products?.map((product: ProductDto) => (
          <ProductCardComponent key={product.id} product={product} />
        ))}
      </div>
      <PaginationComponent num={num} setNum={setNum} />
    </>
  );
}
