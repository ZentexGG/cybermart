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
  const [products, setProducts] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [activePrice, setActivePrice] = useState<string>("");
  const [isShowCart, setIsShowCart] = useState<boolean>(false);

  const handleAddToCart = (product: CartItem) => {
    setCart((prev) => {
      const findProductInCart = prev.find((item) => item.id === product.id);

      if (findProductInCart) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      }

      // First time adding the product to cart
      return [...prev, { ...product, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      return prev.reduce((cal, item) => {
        if (item.id === id) {
          if (item.amount === 1) return cal;

          return [...cal, { ...item, amount: item.amount - 1 }];
        }

        return [...cal, { ...item }];
      }, [] as CartItem[]);
    });
  };

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
      {isShowCart && (
        <Cart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToCart={handleAddToCart}
          setIsShowCart={setIsShowCart}
        />
      )}
      <PaginationComponent />
    </>
  );
}
