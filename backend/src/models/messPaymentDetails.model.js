import mongoose from 'mongoose';

const pay_details = new mongoose.Schema(
    {   name:{type:String,required:true},
        sid: { type: Number, required: true },
        details:[
        {
        month:{ type: String, enum: ['January','February', 'March','April','May','June','July','August','September','October','November','December'], required: true },
        year:{type:Number,required:true},
        amount:{type:Number,required:true},
        rebate:{type:Number,required:true,default:0},
        final_amount:{type:Number,required:true}
    }
]
    },
    { timestamps: true }
);

export default mongoose.model('MessPayDetails', pay_details);