import * as productModel from '../models/products.model';
import { CreateProductDTO, Product } from '../models/products.model';

export const listProducts = async (): Promise<Product[]> => {
  return productModel.getAllProducts();
};

export const addProduct = async (data: CreateProductDTO): Promise<void> => {
  await productModel.createProduct(data);
};
