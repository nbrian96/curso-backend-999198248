import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';

const appointmentService = new AppointmentService();

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const appointments = await appointmentService.findAllByUser(userId);
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const appointment = await appointmentService.create(userId, req.body);
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const appointment = await appointmentService.findById(req.params.id as string, userId);
        if (!appointment) {
            res.status(404).json({ success: false, message: 'Appointment not found' });
            return;
        }
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const appointment = await appointmentService.update(req.params.id as string, userId, req.body);
        if (!appointment) {
            res.status(404).json({ success: false, message: 'Appointment not found' });
            return;
        }
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const appointment = await appointmentService.delete(req.params.id as string, userId);
        if (!appointment) {
            res.status(404).json({ success: false, message: 'Appointment not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

