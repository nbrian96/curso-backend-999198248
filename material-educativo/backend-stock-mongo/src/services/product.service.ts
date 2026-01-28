import { IProduct } from '../models/products.model';
import { Product } from '../models/products.model';

// CRUD

export const createProduct = async (data: IProduct) => {
  const product = new Product(data);
  return await product.save();
};

export const getAllProducts = async () => {
  return await Product.find().populate('categoryId', 'name');
};

export const getProductById = async (id: string) => {
  return await Product.findById(id).populate('categoryId', 'name');
};

// id viene desde la url y el objeto viene desde el body
export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true }).populate(
    'categoryId',
    'name',
  );
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
