import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { checkAuth } from "../../authChecker";

export default function EditProductPage() {
    const { productId } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
      const fetchUserInfo = async () => {
        let userInfo = await checkAuth();
        if (!userInfo || userInfo.role !== "Admin") {
          navigate("/");
          return;
        }
      };
      fetchUserInfo();
    }, []);
  return (
      <div>EditProductPage {productId}</div>
  )
}
