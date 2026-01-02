import { Router } from 'express';
import {
  showDashboard,
  createProduct,
  getAllProducts,
} from '../controllers/products.controller';

const router = Router();

// /products/dashboard
router.get('/dashboard', showDashboard);

// /products/
router.get('/', getAllProducts);

// /products/create
router.post('/create', createProduct);

export default router;
