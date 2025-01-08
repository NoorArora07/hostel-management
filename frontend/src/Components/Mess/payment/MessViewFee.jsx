import pic from "@/Photos/messfee.jpg";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { UtensilsIcon as CutleryIcon, InfoIcon } from 'lucide-react';
import { getFromBackend } from "@/store/fetchdata";

const MessFeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState([]);

  useEffect(() => {
    fetchFeeDetails();
  }, []);

  const fetchFeeDetails = async () => {
    try {
      const response = await getFromBackend("http://127.0.0.1:5090/api/details");
      if (!response.ok) {
        throw new Error("Failed to fetch mess fee details");
      }
      const data = await response.json();
      setFeeDetails(data);
    } catch (error) {
      console.error("Error fetching fee details:", error);
    }
  };

  const rebateInfo = "Rebate is calculated as \u20B950 per day of leave.";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-violet-400 via-pink-500 to-violet-400 mt-14">
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-purple-700 text-white p-6">
          <CardTitle className="text-3xl font-bold flex items-center justify-center">
            <CutleryIcon className="mr-2" />
            Mess Fee Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                <img
                  src={pic}
                  alt="Mess Illustration"
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Homely Meals</h3>
                  <p>Enjoy nutritious and tasty food at affordable price</p>
                </div>
              </div>
              <Card className="bg-blue-50 border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <h3 className="flex items-center text-lg font-semibold text-blue-700 mb-2">
                    <InfoIcon className="mr-2" /> Rebate Information
                  </h3>
                  <p className="text-blue-600">{rebateInfo}</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <FeeTable feeDetails={feeDetails} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FeeTable = ({ feeDetails }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-2xl font-semibold">Fee Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Rebate</TableHead>
            <TableHead>Final Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeDetails.map((fee, index) => (
            <TableRow key={index} className="transition-colors hover:bg-gray-100">
              <TableCell>{fee.month}</TableCell>
              <TableCell>{fee.year}</TableCell>
              <TableCell>{fee.amount}</TableCell>
              <TableCell>{fee.rebate}</TableCell>
              <TableCell>{fee.final_amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default MessFeeDetails;