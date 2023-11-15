import { useEffect, useState } from "react";
import CreateProductForm from "../../Components/CreateProductForm/CreateProductForm";
import { Category } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../authChecker";

export default function CreateProductPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchUserInfo = async () => {
        let userInfo = await checkAuth();
        if (!userInfo || userInfo.role !== "Admin") {
            navigate("/not-found");
            return;
          }
      };
      fetchUserInfo();
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get("/api/categories");
            setCategories(response.data);
        }
        fetchCategories();
    }, [])
  return (
      <div>
          <CreateProductForm categories={categories} />
    </div>
  )
}
