export interface DecodedToken {
  [key: string]: any;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductDto {
  ID: number;
  Name: string;
  Price: number;
  Description: string;
  CategoryId: number;
  Specifications: Specification[];
  photos: ProductPhotoDto[];
}

export interface ProductPhotoDto {
  Id: number;
  FileName: string;
  imageData: ArrayBuffer;
  UploadDate: Date;
}

export interface Specification {
  ID: number;
  ProductId: number;
  SpecificationTypeId: number;
  Value: string;
  Product: Product;
  SpecificationType: SpecificationType;
}

export interface SpecificationType {
  ID: number;
  Name: string;
  CategoryId: number;
  Category: Category;
  Specifications: Specification[];
}

export interface Product {
  ID: number;
  Name: string;
  Price: number;
  Description: string | null;
  CategoryId: number;
  Category: Category;
  Specifications: Specification[];
  Photos: ProductPhoto[] | null;
}

export interface ProductPhoto {
  Id: number;
  FileName: string;
  ImageData: ArrayBuffer;
  UploadDate: Date;
  ProductId: number;
  Product: Product;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  imageData?: string;
  fileName?: string;
}