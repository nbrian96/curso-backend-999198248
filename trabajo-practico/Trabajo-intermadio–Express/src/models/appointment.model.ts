import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
    userId: mongoose.Types.ObjectId;
    veterinarianId: mongoose.Types.ObjectId;
    petName: string;
    date: Date;
    reason: string;
    status: string;
    deleted: boolean;
    deletedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    veterinarianId: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinarian',
        required: true
    },
    petName: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
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

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);

