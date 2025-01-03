import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    name:{type:String,required:false},
    title:{type:String,required:true},
    message: { type: String, required: true },
    seen: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notif", notifSchema);

