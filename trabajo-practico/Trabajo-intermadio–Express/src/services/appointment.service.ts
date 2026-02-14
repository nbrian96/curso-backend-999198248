import Appointment, { IAppointment } from '../models/appointment.model';
import mongoose from 'mongoose';

export class AppointmentService {

    async findAllByUser(userId: string): Promise<IAppointment[]> {
        return await Appointment.find(
            { userId: new mongoose.Types.ObjectId(userId), deleted: false }
        ).populate('veterinarianId', 'name lastName specialty');
    }

    async create(userId: string, data: Partial<IAppointment>): Promise<IAppointment> {
        return await Appointment.create({
            ...data,
            userId: new mongoose.Types.ObjectId(userId)
        });
    }

    async findById(id: string, userId: string): Promise<IAppointment | null> {
        return await Appointment.findOne({
            _id: id,
            userId: new mongoose.Types.ObjectId(userId),
            deleted: false
        }).populate('veterinarianId', 'name lastName specialty');
    }

    async update(id: string, userId: string, data: Partial<IAppointment>): Promise<IAppointment | null> {
        return await Appointment.findOneAndUpdate(
            { _id: id, userId: new mongoose.Types.ObjectId(userId), deleted: false },
            data,
            { new: true }
        ).populate('veterinarianId', 'name lastName specialty');
    }

    async delete(id: string, userId: string): Promise<IAppointment | null> {
        return await Appointment.findOneAndUpdate(
            { _id: id, userId: new mongoose.Types.ObjectId(userId) },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }
}

