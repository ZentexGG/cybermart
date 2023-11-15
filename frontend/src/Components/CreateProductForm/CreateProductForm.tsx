import { useForm } from "react-hook-form";
import { Category, ProductDto, Specification, SpecificationType } from "../../types";
import axios from "axios";
import { useState } from "react";
import { getCookie } from "../../authChecker";

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
  categories
}: {
    categories: Category[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const [categorySpecifications, setCategorySpecifications] = useState<SpecificationType[]>();
  let newProductId: number = 0;

 const onSubmit = async (data: FormData) => {
   const formData = new FormData();
   formData.append("ID", data.ID.toString());
   formData.append("Name", data.Name);
   formData.append("Price", data.Price.toString());
   formData.append("Description", data.Description);
   formData.append("CategoryId", data.CategoryId.toString());

   for (let i = 0; i < data.photos.length; i++) {
     formData.append("photos", data.photos[i]);
   }

   try {
     const userToken = getCookie("token");
     const response = await axios.post("/api/products", formData, {
       headers: {
         "Content-Type": "multipart/form-data",
         "Authorization": `Bearer ${userToken}`
       },
     });
     newProductId = response.data.id
    } catch (error) {
     console.log(error)
   }

   try {
     await axios.post(`/api/specifications/${newProductId}`, data.specifications)
   } catch (error) {
     console.log(error);
   }

 };

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    console.log(categoryId);
    
    try {
      const res = await axios.get<SpecificationType[]>(`/api/specification-types/${categoryId}`)
      setCategorySpecifications(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="max-w-lg mx-auto mt-8 px-4 py-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="ID">
            ID
          </label>
          <input
            type="number"
            {...register("ID")}
            className="form-input w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="Name"
          >
            Product Name
          </label>
          <input
            type="text"
            {...register("Name")}
            className="form-input w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="CategoryId"
          >
            Category
          </label>
          <select
            {...register("CategoryId")}
            onChange={handleCategoryChange}
            className="form-select w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-bold text-gray-700">
            Specifications
          </label>
          {categorySpecifications?.map((spec, index) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-bold text-gray-600"
                    htmlFor={`specifications.${index}.ID`}
                  >
                    {spec.name}
                  </label>
                  <input
                    type="hidden"
                    {...register(
                      `specifications.${index}.specificationTypeId`,
                      {
                        value: spec.id, // Set the value to the SpecificationTypeId
                      }
                    )}
                  />
                  <input
                    type="text"
                    {...register(`specifications.${index}.value`)}
                    className="form-input w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="Description"
          >
            Description
          </label>
          <textarea
            {...register("Description")}
            className="form-textarea w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={3}
          />
        </div>
        <div>
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="Price"
          >
            Price
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            {...register("Price")}
            className="form-input w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="photos"
          >
            Photos
          </label>
          <input
            type="file"
            {...register("photos")}
            multiple
            className="form-input w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        {/* Render input fields for specifications */}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3 mt-4 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
