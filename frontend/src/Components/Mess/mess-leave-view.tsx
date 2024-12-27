import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { getFromBackend }  from "@/store/fetchdata";

interface MessLeave {
  id: number;
  dateOfLeaving: Date;
  dateOfReturn: Date;
  reason: string;
  lastMeal: string;
  firstMeal: string;
}

const MessLeavesView: React.FC = () => {
  const [messLeaves, setMessLeaves] = useState<MessLeave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessLeaves = async () => {
      try {
          const response = await getFromBackend("http://127.0.0.1:5090/api/mess/leave-details");
  
          const messData = response.data.messOffDates.map((application: any) => ({
              id: application._id || Math.random(), // Use a unique key
              dateOfLeaving: application.dateOfLeaving,
              dateOfReturn: application.dateOfReturn,
              reason: application.reason,
              lastMeal: application.lastMeal,
              firstMeal: application.firstMeal,
          }));
  
          setMessLeaves(messData);
      } catch (err) {
          setError("Failed to fetch mess leaves.");
          console.error("Error fetching mess leaves:", err);
      } finally {
          setLoading(false);
      }
  };

    fetchMessLeaves();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Mess Leaves Overview
      </h1>

      <Card className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-600">
            Mess Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messLeaves.length === 0 ? (
            <p className="text-center text-gray-600">No leave requests found.</p>
          ) : (
            <Table className="table-auto border-collapse border border-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead className="border px-4 py-2 text-left text-gray-600">
                    Leave Date
                  </TableHead>
                  <TableHead className="border px-4 py-2 text-left text-gray-600">
                    Return Date
                  </TableHead>
                  <TableHead className="border px-4 py-2 text-left text-gray-600">
                    Reason
                  </TableHead>
                  <TableHead className="border px-4 py-2 text-left text-gray-600">
                    Last Meal
                  </TableHead>
                  <TableHead className="border px-4 py-2 text-left text-gray-600">
                    First Meal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messLeaves.map((leave) => (
                  <TableRow key = {leave.id}>
                    <TableCell className="border px-4 py-2">
                      {new Date(leave.dateOfLeaving).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {new Date(leave.dateOfReturn).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border px-4 py-2">
                      {leave.reason}
                    </TableCell>
                    <TableCell className="border px-4 py-2 capitalize">
                      {leave.lastMeal}
                    </TableCell>
                    <TableCell className="border px-4 py-2 capitalize">
                      {leave.firstMeal}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessLeavesView;
