import pic from "@/Photos/messfee.jpg"; 
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { HomeIcon } from 'lucide-react';
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

const HostelFeeDetails = () => {
  const feeDetails = [
    { year: "1st Year", amount: "₹25,000" },
    { year: "2nd Year", amount: "₹24,000" },
    { year: "3rd Year", amount: "₹23,000" },
    { year: "4th Year", amount: "₹22,000" },
  ];

  return (
    <div>
    <BackgroundGradientAnimation>
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-purple-700 text-white p-6">
          <CardTitle className="text-3xl font-bold flex items-center justify-center">
            <HomeIcon className="justify-center mr-3 size-20" />
            Hostel Fee Details
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
                  <h3 className="text-xl font-semibold">Houses can be brought</h3>
                  <p>but home has no price. We wish to bring you the closest experience to yoour homes!</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <FeeTable feeDetails={feeDetails} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </BackgroundGradientAnimation>
    </div>
  );
};

const FeeTable = ({ feeDetails }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-2xl font-semibold">Fee Details:</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeDetails.map((fee, index) => (
            <TableRow key={index} className="transition-colors hover:bg-gray-100">
              <TableCell>{fee.year}</TableCell>
              <TableCell>{fee.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default HostelFeeDetails;
