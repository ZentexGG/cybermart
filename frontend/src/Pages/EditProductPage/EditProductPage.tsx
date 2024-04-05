import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkAuth } from "../../authChecker";
import axios from "axios";
import { Category, ProductDto } from "../../types";
import EditProductForm from "../../Components/EditProductForm/EditProductForm";

export default function EditProductPage() {
  const { productId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDto>();
  const [categories, setCategories] = useState<Category[]>();

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
    const fetchProductInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get<ProductDto>(`/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>('/api/categories')
        setCategories(res.data);
      } catch (err) {
        console.error(err)
      }
    }
    fetchProductInfo();
    fetchCategories();
  }, [productId]);

  return <>
    <EditProductForm existingData={product as ProductDto} categories={categories as Category[]}/>

  </>;
}
