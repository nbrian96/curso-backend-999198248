import mongoose, { Document, Schema } from 'mongoose';

export interface IVeterinarian extends Document {
    name: string;
    lastName: string;
    medicalLicense: string;
    specialty: string;
    deleted: boolean;
    deletedAt: Date;
}

const VeterinarianSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    medicalLicense: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    specialty: {
        type: String,
        required: true,
        trim: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model<IVeterinarian>('Veterinarian', VeterinarianSchema);
