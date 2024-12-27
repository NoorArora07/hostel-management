import mongoose from 'mongoose';

const messSchema = new mongoose.Schema(
    {
        sid: { type: Number, required: true },
        feeStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
        messOffDates: [
            {
                dateOfLeaving: { type: Date, required: true },
                dateOfReturn: { type: Date, required: true },
                reason:{type:String,required:true},
                lastMeal: { type: String, enum: ['None','Breakfast', 'Lunch','Dinner'], required: true },
                firstMeal: { type: String, enum: ['Breakfast','Lunch','Snacks','Dinner'], required: true },
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model('Mess', messSchema);
