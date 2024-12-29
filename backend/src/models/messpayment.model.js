import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  studentId: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  amount: { type: Number, required: true },
});

export default mongoose.model('Fee', feeSchema);


// const paymentSchema = new mongoose.Schema({
//   paymentIntentId: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ['paid', 'pending', 'transaction_failed'],
//   },
//   failureReason: {
//     type: String,
//     default: null, 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

//export default mongoose.model('Payment', paymentSchema);

