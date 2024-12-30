import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true, // sent date
  },
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
});

const studentSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  sid: {
    type: String,
    required: true,
    unique: true, 
  },
  branch: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  complaints: {
    type: [complaintSchema], // Array of complaint objects
    default: [],
  },
});

export default mongoose.model("Complaint", studentSchema);
