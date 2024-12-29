import Complaint from "../models/complaints.model.js";
import dotenv from 'dotenv';

dotenv.config();


export const addComplaint = async (request, response) => {
    const {sid} = request.user;
    const { title, description } = request.body;
    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required!" });
    }

  try {
    const today = new Date();

    // Calculate the start of the current week (Sunday)
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const complaint = await Complaint.findOne({ sid });

    if (!complaint) {
         // If no record exists for the student, create a new one
         const newComplaint = new Complaint({
            sid,
            branch: request.user.branch || "Unknown",
            roomNumber: request.body.roomNumber || "Unknown",
            complaints: [],
        });

        // Create the first complaint 
        const firstComplaint = {
          title,
          description,
          date: new Date(),
          status: "pending",
      };
      
        // Add the first complaint to the array
        newComplaint.complaints.push(firstComplaint);

        // Save the newly created complaint document with the first complaint
        await newComplaint.save(); 
        
        return response.status(201).json({
            message: "Complaint added successfully!",
            complaints: newComplaint.complaints,
        });
    }

    // Count complaints for the current week
    const weeklyComplaints = complaint.complaints.filter(
      (comp) => comp.date >= startOfWeek
    );

    if (weeklyComplaints.length >= 3) {
      return response.status(400).json({
        message: "Weekly limit reached. You can only send 3 complaints per week.",
      });
    }

    const newComplaint = {
      title,
      description,
      date: new Date(),
      status: "pending",
    };

    complaint.complaints.push(newComplaint);

    await complaint.save();

    response.status(201).json({
      message: "Complaint added successfully!",
      complaints: complaint.complaints,
    });
  } catch (error) {
    console.error("Error adding complaint:", error);
    response.status(500).json({
      message: "An error occurred while adding the complaint.",
    });
  }
};


export const viewComplaints = async (request, response) => {
    const  {sid}  = request.user; 
  
    try {
      const complaint = await Complaint.findOne( {sid} );
  
      if (!complaint) {
        return response.status(404).json({
          message: "No complaints found.",
        });
      }
  
      response.status(200).json({
        complaints: complaint.complaints,
      });
    } catch (error) {
      console.error("Error viewing complaints:", error);
      response.status(500).json({
        message: "An error occurred while fetching complaints.",
      });
    }
  };

  
  export const viewComplaintsByStatus = async (request, response) => {
    const  {sid} = request.user;
    const {status }= request.body;
  
    try {
      const complaint = await Complaint.findOne( {sid} );
  
      if (!complaint) {
        return response.status(404).json({
          message: "No complaints found.",
        });
      }
  
      const filteredComplaints = complaint.complaints.filter(
        (complaint) => complaint.status === status
      );
  
      response.status(200).json({
        complaints: filteredComplaints,
      });
    } catch (error) {
      console.error("Error filtering complaints:", error);
      response.status(500).json({
        message: "An error occurred while filtering complaints.",
      });
    }
  };
  