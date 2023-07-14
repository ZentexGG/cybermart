import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../../Components/Footer/FooterComponent";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { useEffect, useState } from "react";
import Cart from "../../Components/ShoppingCart/ShoppingCartComponent";
import { DecodedToken } from "../../types";
import { checkAuth } from "../../authChecker";

interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
}

export default function Layout() {
  const [userInfo, setUserInfo] = useState<DecodedToken | boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await checkAuth();
      setUserInfo(user);
    };
    console.log(document.cookie.length);
    

    fetchUserInfo();
  }, [location]);

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
        <NavbarComponent handleShowCart={handleShowCart} userInfo={userInfo} />
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
}
