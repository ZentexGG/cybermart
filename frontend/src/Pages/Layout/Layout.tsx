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
  setIsFetching: (isFetching: boolean) => void;
  userInfo : (DecodedToken | boolean)
}>({
  handleAddToCart: () => {
    console.warn("handleAddToCart wrong.");
  },
  setIsFetching: () => {
    console.warn("wrong");
  },
  userInfo : ()=>{
    console.warn("no user info")
  }
});

export default function Layout() {
  const [userInfo, setUserInfo] = useState<DecodedToken | boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>("cart", {
    storageSync: true,
    defaultValue: [],
  });
  const [products, setProducts] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activePrice, setActivePrice] = useState<string>("");
  const [isShowCart, setIsShowCart] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await checkAuth();
      setUserInfo(user);
      setIsFetching(false);
    };
    fetchUserInfo();
    setCart(cartItems);
  }, [location]);

  const handleShowCart = () => {
    setIsShowCart(true);
  };

  const handleAddToCart = (product: CartItem) => {
    setCart((prev) => {
      const findProductInCart = prev.find((item) => item.id === product.id);

      if (findProductInCart) {
        setCartItems(
          prev.map((item) =>
            item.id === product.id ? { ...item, amount: item.amount + 1 } : item
          )
        );
        return prev.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      setCartItems([...prev, { ...product, amount: 1 }]);

      return [...prev, { ...product, amount: 1 }];
    });
  };

  const handleRemoveFromCart = async (id: string) => {
    setCart((prev) => {
      return prev.reduce((cal, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            setCartItems(cal);
            return cal;
          }
          setCartItems([...cal, { ...item, amount: item.amount - 1 }]);
          return [...cal, { ...item, amount: item.amount - 1 }];
        }
        setCartItems([...cal, { ...item }]);
        return [...cal, { ...item }];
      }, [] as CartItem[]);
    });
  };

  return isFetching ? (
    <Loader />
  ) : (
    <LayoutContext.Provider value={{ handleAddToCart, setIsFetching, userInfo }}>
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
          <Outlet context={{ setIsFetching, handleAddToCart }} />
        </div>
        <div className="bg-white shadow mt-auto">
          <FooterComponent />
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
