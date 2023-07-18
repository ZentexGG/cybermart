import { useForm } from "react-hook-form";
import { Category, Specification } from "../../types";
import axios from "axios";

interface FormData {
  ID: number;
  Name: string;
  Price: number;
  Description: string;
  CategoryId: number;
  specifications: Specification[];
  photos: FileList;
}

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("ID", data.ID.toString());
    formData.append("Name", data.Name);
    formData.append("Price", data.Price.toString());
    formData.append("Description", data.Description);
    formData.append("CategoryId", data.CategoryId.toString());
    data.specifications?.forEach((spec, index) => {
      formData.append(`specifications[${index}].ID`, spec.ID.toString());
      formData.append(
        `specifications[${index}].ProductId`,
        spec.ProductId.toString()
      );
      formData.append(
        `specifications[${index}].SpecificationTypeId`,
        spec.SpecificationTypeId.toString()
      );
      formData.append(`specifications[${index}].Value`, spec.Value);
    });
    for (let i = 0; i < data.photos.length; i++) {
      formData.append("photos", data.photos[i]);
    }

    try {
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" placeholder="ID" {...register("ID")} />
      <input type="text" placeholder="Product name" {...register("Name")} />
      <select {...register("CategoryId")}>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        {...register("Description")}
      />
      <input type="number" placeholder="Price" {...register("Price")} />
      <input type="file" {...register("photos")} multiple />
      {/* Render input fields for specifications */}
      {watch("specifications")?.map((spec, index) => (
        <div key={index}>
          <input
            type="number"
            placeholder="Specification ID"
            {...register(`specifications.${index}.ID` as const)}
          />
          <input
            type="number"
            placeholder="Product ID"
            {...register(`specifications.${index}.ProductId` as const)}
          />
          <input
            type="number"
            placeholder="Specification Type ID"
            {...register(
              `specifications.${index}.SpecificationTypeId` as const
            )}
          />
          <input
            type="text"
            placeholder="Value"
            {...register(`specifications.${index}.Value` as const)}
          />
        </div>
      ))}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
