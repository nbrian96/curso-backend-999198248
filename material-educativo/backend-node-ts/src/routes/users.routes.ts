import { Router } from 'express';
import { getAllUsers, addUser } from '../controllers/users.controller';

const router = Router();

// GET /api/users/
router.get('/', getAllUsers);

// POST /api/users/
router.post('/', addUser);

export default router;
