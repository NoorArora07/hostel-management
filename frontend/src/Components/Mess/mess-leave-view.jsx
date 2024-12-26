import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"

// Sample data - in a real application, this would come from an API or database
const messLeaves = [
  { id: 1, dateOfLeaving: '2023-06-01', dateOfReturn: '2023-06-05', reason: 'Family vacation', lastMeal: 'breakfast', firstMeal: 'dinner' },
  { id: 2, dateOfLeaving: '2023-06-10', dateOfReturn: '2023-06-12', reason: 'Medical appointment', lastMeal: 'lunch', firstMeal: 'breakfast' },
  { id: 3, dateOfLeaving: '2023-06-15', dateOfReturn: '2023-06-20', reason: 'Home visit', lastMeal: 'dinner', firstMeal: 'lunch' },
];

const MessLeavesView = () => {
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

