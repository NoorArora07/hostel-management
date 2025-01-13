import pic from "@/Photos/messfee.jpg";
import picbg from '@/Photos/messdetailsbg.jpg'
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { UtensilsIcon as CutleryIcon, InfoIcon } from 'lucide-react';
import { getFromBackend } from "@/store/fetchdata";
import { baseUrl } from "@/urls";

const MessFeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState([]);

  useEffect(() => {
    fetchFeeDetails();
  }, []);

  const fetchFeeDetails = async () => {
    try {
      const response = await getFromBackend(`${baseUrl}/api/details`);
      console.log("Raw Axios response:", response);
      
      const data = response.data; 
      console.log("Parsed data:", data);

      if (typeof(data.message) === "string" || !data || data.length === 0) {
        return ;
        throw new Error("No fee details available.");
      }
  
      setFeeDetails(data);
    } catch (error) {
      console.error("Error fetching fee details:", error.response ? error.response.data : error.message);
    }
  };

  const rebateInfo = "Rebate is calculated as \u20B935 per Saturday or Sunday, only if no meal was consumed on either day!";

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
    style={{
      backgroundImage: `url(${picbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-black text-white p-6">
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
              <Card className="bg-violet-100 border-l-4 border-violet-500">
                <CardContent className="p-4">
                  <h3 className="flex items-center text-lg font-semibold text-violet-700 mb-2">
                    <InfoIcon className="mr-2" /> Rebate Information
                  </h3>
                  <p className="text-violet-600">{rebateInfo}</p>
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
            <TableHead>Status</TableHead>
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
              <TableCell>{fee.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default MessFeeDetails;