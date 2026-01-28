import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types/categories';

// Necesito definir el Schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // el trim elimina espacios al inicio y al final
    },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

// Definir el modelo
export const Category = mongoose.model<ICategory>('Category', categorySchema);
