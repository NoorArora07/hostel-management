import Complaint from "../models/complaints.model.js";
import UsersData from "../models/userDetail.model.js";
import dotenv from 'dotenv';

dotenv.config();

export const addComplaint = async (request, response) => {
    const {sid} = request.user;
    const {name} =  request.user;
    const { title, description } = request.body;
    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required!" });
    }

  try {

    const userDetail = await UsersData.findOne({sid});

    if(! userDetail){
        console.log("No such user exists");
        return response.status(500).send("User doesn't exist");
    }

    const branch = userDetail.branch;

    const today = new Date();

    // Calculate the start of the current week (Sunday)
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const complaint = await Complaint.findOne({ sid });

    if (!complaint) {
         // creating new record if 0 complaints were sent before
         const newComplaint = new Complaint({
            name,
            sid,
            branch: branch || "Unknown",
            roomNumber: request.body.roomNumber || "Unknown",
            complaints: [],
        });

        const firstComplaint = {
          title,
          description,
          date: new Date(),
          status: "pending",
      };
      
        newComplaint.complaints.push(firstComplaint);

        await newComplaint.save(); 
        
        return response.status(201).json({
            message: "Complaint added successfully!",
            complaints: newComplaint.complaints,
        });
    }

    //complaint limit=3
    const weeklyComplaints = complaint.complaints.filter(
      (comp) => comp.date >= startOfWeek
    );

    if (weeklyComplaints.length >= 3) {
      return response.json({
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
      const reversedComplaints = complaint.complaints.reverse();
      response.status(200).json({
        complaints: reversedComplaints,
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
      const reversedComplaints = filteredComplaints.reverse();
      response.status(200).json({
        complaints: reversedComplaints,
      });
    } catch (error) {
      console.error("Error filtering complaints:", error);
      response.status(500).json({
        message: "An error occurred while filtering complaints.",
      });
    }
  };
  