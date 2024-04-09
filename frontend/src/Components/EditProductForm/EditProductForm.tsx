import { useForm } from "react-hook-form";
import {
  Category,
  ProductDto,
  Specification,
  SpecificationDto,
  SpecificationType,
} from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
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

export default function EditProductForm({
  existingData,
  categories,
}: {
  existingData: ProductDto;
  categories: Category[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({ mode: "onChange" });

  const [categorySpecifications, setCategorySpecifications] =
    useState<SpecificationType[]>();
  const [categorySpecValues, setCategorySpecValues] = useState<SpecificationDto[]>(existingData?.specifications);

  useEffect(() => {
    setValue("ID", existingData?.id);
    setValue("Name", existingData?.name);
    setValue("CategoryId", existingData?.categoryId);
    setValue("Description", existingData?.description);
    setValue("Price", existingData?.price);
  }, [setValue, existingData]);

  const currentSelectedCategory = watch("CategoryId");
  useEffect(() => {
    const fetchInitialCategory = async () => {
      try {
        let res = await axios.get<SpecificationType[]>(
          `/api/specification-types/${currentSelectedCategory}`
        );
        setCategorySpecifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentSelectedCategory !== undefined) {
      fetchInitialCategory();
    }
  }, [currentSelectedCategory]);

  const onSubmit = async (data: FormData) => {
    console.log(data.specifications);
    try {
      const userToken = getCookie("token");
      let productPut = await axios.put(`/api/products/${existingData?.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${userToken}`,
        },
      });
      let specsPut = await axios.put(`/api/specifications/${existingData?.id}`, data.specifications, {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="ID">
            ID
          </label>
          <input
            type="number"
            {...register("ID")}
            defaultValue={existingData?.id}
            disabled
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
            defaultValue={existingData?.name}
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
            defaultValue={existingData?.categoryId}
            className="form-select w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            {categories?.map((c) => (
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
                    defaultValue={currentSelectedCategory === existingData?.categoryId ? existingData?.specifications[index].value : ""}
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
            defaultValue={existingData?.description}
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
            defaultValue={existingData?.price}
            min={0}
            step={0.01}
            {...register("Price")}
            className="form-input w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
