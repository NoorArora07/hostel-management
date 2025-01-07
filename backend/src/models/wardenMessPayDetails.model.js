import mongoose from 'mongoose';

const pay_details = new mongoose.Schema(
    {   month:{ type: String, enum: ['January','February', 'March','April','May','June','July','August','September','October','November','December'], required: true },
        year:{type:Number,required:true},
        amount:{type:Number,required:true},
    },
    { timestamps: true }
);

export default mongoose.model('PayDetails', pay_details);