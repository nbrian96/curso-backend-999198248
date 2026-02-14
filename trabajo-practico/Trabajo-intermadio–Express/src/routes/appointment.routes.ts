import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import {
    getAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointment.controller';
import { createAppointmentValidator, updateAppointmentValidator } from '../validator/appointment.validator';

const router = Router();

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointmentValidator, createAppointment);
router.get('/:id', protect, getAppointmentById);
router.patch('/:id', protect, updateAppointmentValidator, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

export default router;

