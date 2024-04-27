import { useForm } from "react-hook-form";
import {
  Category,
  ProductDto,
  ProductPhotoDto,
  Specification,
  SpecificationDto,
  SpecificationType,
} from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../authChecker";
import LoadingBtn from "../LoadingBtn/LoadingBtn";
import DbImage from "../DbImage/DbImage";
import { FaEdit, FaTrash } from "react-icons/fa";

interface FormData {
  ID: number;
  Name: string;
  Price: number;
  Description: string;
  CategoryId: number;
  specifications: Specification[];
  photos: ProductPhotoDto[];
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
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<ProductPhotoDto[]>(existingData?.photos);
  const userToken = getCookie("token");


  useEffect(() => {
    setValue("ID", existingData?.id);
    setValue("Name", existingData?.name);
    setValue("CategoryId", existingData?.categoryId);
    setValue("Description", existingData?.description);
    setValue("Price", existingData?.price);
    setValue("photos", existingData?.photos);
    setPhotos(existingData?.photos);
  }, [setValue, existingData]);

  const currentSelectedCategory = watch("CategoryId");
  const currentPhotos = watch("photos");
  useEffect(() => {
    const fetchInitialCategory = async () => {
      console.log(existingData?.photos);
      try {
        setLoading(true);
        let res = await axios.get<SpecificationType[]>(
          `/api/specification-types/${currentSelectedCategory}`
        );
        setCategorySpecifications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentSelectedCategory !== undefined) {
      fetchInitialCategory();
    }
  }, [currentSelectedCategory]);

  const imageClick = (imgId: number) => {
    let res = document.getElementById(`img_${imgId}`)?.click();
    console.log(res);
  };

  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>, imgIndex: number, imgId: number) => {
    let currentPhotos : ProductPhotoDto[] = photos
    const file = e.target.files?.[0]
    if (file !== undefined) {
      try {
        setLoading(true);
        const formData = new FormData()
        formData.append("photo", file)
        let res = await axios.put(`/api/product-photos/${imgId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`
          }
        })
        const newPhoto: ProductPhotoDto = res.data;
        currentPhotos[imgIndex] = newPhoto;
        setPhotos(currentPhotos)

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      
    }
      
  }
  const deleteImage = (imgId: number) => {};

  const onSubmit = async (data: FormData) => {
    console.log(currentPhotos);
    setLoading(true);
    const dataToSubmit = {
      ID: data.ID,
      Name: data.Name,
      Description: data.Description,
      Price: data.Price.toString().replace(".", ","),
      CategoryId: data.CategoryId,
      Specifications: data.specifications,
    };
    try {
      // let productPut = await axios.put<FormData>(
      //   `/api/products/${existingData?.id}`,
      //   dataToSubmit,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${userToken}`,
      //     },
      //   }
      // );
      // console.log(productPut.config);
      // let specsPut = await axios.put(
      //   `/api/specifications/${existingData?.id}`,
      //   data.specifications,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${userToken}`,
      //     },
      //   }
      // );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
                    defaultValue={
                      currentSelectedCategory === existingData?.categoryId &&
                      existingData?.specifications.length > 0
                        ? existingData?.specifications[index].value
                        : ""
                    }
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
        <div className="flex">
          {photos?.map((photo, index) => (
            <div
              key={photo.id}
              className="relative mr-4"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <DbImage key={photo.id} imageData={photo.imageData} />
              <input
                id={`img_${photo.id}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => changeImg(e, index, photo.id)}
              />

              {/* Conditional rendering of overlay for the hovered image */}
              {hoveredId === photo.id && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <button
                    className="text-white mr-2"
                    onClick={() => imageClick(photo.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-white"
                    onClick={() => deleteImage(photo.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            className="w-full py-2 px-4 bg-red-700 hover:bg-red-800 rounded-md text-white text-sm"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoadingBtn /> : <span>Submit</span>}
          </button>
        </div>
      </form>
    </>
  );
}
