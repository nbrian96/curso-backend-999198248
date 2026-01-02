import { Request, Response } from 'express';
import * as productService from '../services/products.service';
import { CreateProductDTO } from '../models/products.model';

export const showDashboard = async (req: Request, res: Response) => {
  const products = await productService.listProducts();
  res.render('products', { products });
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.listProducts();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error al obtener los productos' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity, category_id } = req.body;

    if (!name || !price || !quantity || !category_id) {
      return res
        .status(400)
        .json({ success: false, message: 'Faltan datos obligatorios' });
    }

    const newProduct: CreateProductDTO = {
      name,
      price: Number(price),
      quantity: Number(quantity),
      category_id: Number(category_id),
    };

    await productService.addProduct(newProduct);
    res
      .status(201)
      .json({ success: true, message: 'Producto creado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error al crear el producto' });
  }
};
