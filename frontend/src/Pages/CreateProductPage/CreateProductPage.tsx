import { useEffect, useState } from "react";
import CreateProductForm from "../../Components/CreateProductForm/CreateProductForm";
import { Category } from "../../types";
import axios from "axios";

export default function CreateProductPage() {
    const [categories, setCategories] = useState<Category[]>([]);
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
