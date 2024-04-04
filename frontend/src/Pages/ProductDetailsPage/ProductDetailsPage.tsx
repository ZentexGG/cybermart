import { useEffect, useState } from "react";
import ProductDetailsComponent from "../../Components/ProductDetail/ProductDetailsComponent";
import { DecodedToken } from "../../types";
import { checkAuth } from "../../authChecker";

export default function ProductDetailsPage() {
  const [loggedInUser, setLoggedInUser] = useState<boolean | DecodedToken>(
    false
  );
  useEffect(() => {
    const fetchInfo = async () => {
      let userInfo = await checkAuth();
      setLoggedInUser(userInfo);
    };
    fetchInfo();
  }, []);
  return <ProductDetailsComponent loggedInUser={loggedInUser} />;
}
