import { useForm } from "react-hook-form";
import { Category } from "../../types";
import axios from "axios";

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
    }) {
    
    interface ProductPhoto {
        fileName: string;
        imageData: string;
        
    }
  interface FormData {
      name: string;
      description: string;
    categoryId: number;
    photos: FileList;
    price: number;
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = (data: FormData) => {
    const createProduct = async () => {
      const response = await axios.post(
        "/api/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      console.log(data.photos);
    };
    createProduct();
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Product name" {...register("name")} />
      <select {...register("categoryId")}>
        {categories.map((c) => (
          <option value={c.id}>{c.name}</option>
        ))}
          </select>
          <input type="text" {...register("description")} />
      <input type="number" {...register("price")} placeholder="price" />
      <input type="file" {...register("photos")} />
      <button type="submit">Submit</button>
    </form>
  );
}
