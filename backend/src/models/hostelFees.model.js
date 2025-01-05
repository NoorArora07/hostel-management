import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  name:{type:String,required:true},
  studentId: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  amount: { type: Number, required: true },
});

export default mongoose.model('HostelFee', feeSchema);


