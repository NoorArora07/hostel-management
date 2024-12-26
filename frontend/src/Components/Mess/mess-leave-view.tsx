import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

const MessLeavesView = () => {
  interface MessLeave {
    id: number;
    dateOfLeaving: string;
    dateOfReturn: string;
    reason: string;
    lastMeal: string;
    firstMeal: string;
  }

  const [messLeaves, setMessLeaves] = useState<MessLeave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchMessLeaves = async () => {
      try {
        const response = await axios.get('/api/mess-leaves'); // Replace with your backend API endpoint
        setMessLeaves(response.data); // Assuming the API returns an array of leave objects
      } catch (err) {
        setError("Failed to fetch mess leaves.");
        console.error(err);
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Mess Leaves Overview</h1>
      
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-600">Mess Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leave Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Last Meal</TableHead>
                <TableHead>First Meal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.dateOfLeaving}</TableCell>
                  <TableCell>{leave.dateOfReturn}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell className="capitalize">{leave.lastMeal}</TableCell>
                  <TableCell className="capitalize">{leave.firstMeal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessLeavesView;
