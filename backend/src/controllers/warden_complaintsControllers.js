import Complaint from "../models/complaints.model.js";

export const getAllComplaints = async (request, response) => {
  try {
    if (request.user.role !== "warden") {
        return response.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find().lean();

    if (!complaints || complaints.length === 0) {
      return response.status(404).json({ message: "No complaints found." });
    }

    // Flatten the data to include student info with each complaint
    const formattedComplaints = complaints.flatMap((student) =>
      student.complaints.map((comp) => ({
        sid: student.sid,
        branch: student.branch,
        roomNumber: student.roomNumber,
        ...comp,
      }))
    );

    response.status(200).json({ complaints: formattedComplaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    response.status(500).json({
      message: "An error occurred while fetching complaints.",
    });
  }
};

export const updateComplaintStatus = async (request, response) => {
  const { sid, complaintId, status } = request.body;

  if (!["resolved", "rejected"].includes(status)) {
    return response.status(400).json({ message: "Invalid status provided." });
  }

  try {
    if (request.user.role !== "warden") {
        return response.status(403).json({ message: "Access denied" });
    }

    const complaint = await Complaint.findOne({ sid });

    if (!complaint) {
      return response.status(404).json({ message: "No complaints found." });
    }

    const complaintToUpdate = complaint.complaints.id(complaintId);

    if (!complaintToUpdate) {
      return response
        .status(404)
        .json({ message: "Complaint not found for the student." });
    }

    complaintToUpdate.status = status;

    await complaint.save();

    response.status(200).json({
      message: "Complaint status updated successfully.",
      complaint: complaintToUpdate,
    });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    response.status(500).json({
      message: "An error occurred while updating complaint status.",
    });
  }
};
