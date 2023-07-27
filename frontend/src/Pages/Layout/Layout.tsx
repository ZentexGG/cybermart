import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../../Components/Footer/FooterComponent";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { createContext, useEffect, useState } from "react";
import Cart from "../../Components/ShoppingCart/ShoppingCartComponent";
import { DecodedToken } from "../../types";
import { checkAuth } from "../../authChecker";
import Loader from "../Loader/Loader";
import useLocalStorageState from "use-local-storage-state";
import { CartItem } from "../../types";


export const LayoutContext = createContext<{
  handleAddToCart: (product: CartItem) => void;
}>({
  handleAddToCart: () => {
    console.warn("handleAddToCart wrong.");
  },
});

export default function Layout() {
  const [userInfo, setUserInfo] = useState<DecodedToken | boolean>(false);
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const [cartItems, setCartItems] = useLocalStorageState('cart')
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await checkAuth();
      setUserInfo(user);
      setIsFetching(false);
    };
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

      return [...prev, { ...product, amount: 1 }];
    });

    setCartItems(cart);
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

  return isFetching ? (
    <Loader />
  ) : (
    <LayoutContext.Provider value={{handleAddToCart}}>
      <div className="flex flex-col h-screen">
        <div className="flex-grow">
          <NavbarComponent
            handleShowCart={handleShowCart}
            userInfo={userInfo}
          />
          {isShowCart && (
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToCart={handleAddToCart}
              setIsShowCart={setIsShowCart}
            />
          )}
          <Outlet context={[isFetching, setIsFetching, handleAddToCart]} />
        </div>
        <div className="bg-white shadow mt-auto">
          <FooterComponent />
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
