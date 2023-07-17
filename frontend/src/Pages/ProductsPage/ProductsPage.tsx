import { useEffect, useState } from "react";
import ProductCarcComponent from "../../Components/ProductCard/ProductCardComponent";
import PaginationComponent from "../../Components/Pagination/PaginationComponent";
import Cart from "../../Components/ShoppingCart/ShoppingCartComponent";
import axios from "axios";
interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
}

export default function ProductsPage() {

  // TODO: Replace <any> with proper interface
  const [products, setProducts] = useState<any>(); 
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data)
    }
    fetchProducts();
  }, [])

  

  return (
    <>
      <div className="grid max-w-screen justify-center items-center place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 my-5">
        {products?.map((p: any) => <ProductCarcComponent productName={p.name} image={p.photos[0].imageData} />)}
      </div>
      <PaginationComponent />
    </>
  );
}
