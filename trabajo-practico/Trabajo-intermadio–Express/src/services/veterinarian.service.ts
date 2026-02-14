import Veterinarian, { IVeterinarian } from '../models/veterinarian.model';

export class VeterinarianService {

    async findAllSpecialists(): Promise<IVeterinarian[]> {
        return await Veterinarian.find(
            { deleted: false },
            { name: 1, lastName: 1, specialty: 1, id: '$_id', _id: 0 }
        );
    }

    async create(data: Partial<IVeterinarian>): Promise<IVeterinarian> {
        return await Veterinarian.create(data);
    }

    async findById(id: string): Promise<IVeterinarian | null> {
        return await Veterinarian.findOne({ _id: id, deleted: false });
    }

    async update(id: string, data: Partial<IVeterinarian>): Promise<IVeterinarian | null> {
        return await Veterinarian.findOneAndUpdate(
            { _id: id, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string): Promise<IVeterinarian | null> {
        return await Veterinarian.findOneAndUpdate(
            { _id: id },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }
}
