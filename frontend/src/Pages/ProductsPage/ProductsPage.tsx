import { useState } from "react";
import ProductCarcComponent from "../../Components/ProductCard/ProductCarcComponent";
import PaginationComponent from "../../Components/Pagination/PaginationComponent";
import Cart from "../../Components/ShoppingCart/ShoppingCartComponent";
interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
}

export default function ProductsPage() {

  return (
    <>
      <div className="grid max-w-screen justify-center items-center place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 my-5">
        <ProductCarcComponent />
        <ProductCarcComponent />
        <ProductCarcComponent />
        <ProductCarcComponent />
        <ProductCarcComponent />
        <ProductCarcComponent />
        <ProductCarcComponent />
        <ProductCarcComponent />
      </div>
      <PaginationComponent />
    </>
  );
}
