import { Outlet } from "react-router-dom";
import FooterComponent from "../../Components/Footer/FooterComponent";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { useState } from "react";
import Cart from "../../Components/ShoppingCart/ShoppingCartComponent";

interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
}

const Layout = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activePrice, setActivePrice] = useState<string>("");
  const [isShowCart, setIsShowCart] = useState<boolean>(false);

  const handleShowCart = () => {
    setIsShowCart(true);
  };

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
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <NavbarComponent handleShowCart={handleShowCart} />
        {isShowCart && (
          <Cart
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddToCart={handleAddToCart}
            setIsShowCart={setIsShowCart}
          />
        )}
        <Outlet />
      </div>
      <div className="bg-white shadow mt-auto">
        <FooterComponent />
      </div>
    </div>
  );
};

export default Layout;
