import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true},
    message: {
        type: String,
        required: true },
    field:{
      type:String,
      required:true,
      enum: ['complaint' , 'long_leave' , 'late_leave' , 'rooM' , 'mess_event','mess_payDetails' ] ,
    },
    seen: {
        type: Boolean,
        default: false }, 
    createdAt: {
        type: Date,
        default: Date.now },
});

const notifs = mongoose.Schema({
  userId:{
    type: Number, 
    required: false,
    unique:true},
  notifications: {
    type: [notifSchema],
    default: [],
  },
});

export default mongoose.model("Notif", notifs);