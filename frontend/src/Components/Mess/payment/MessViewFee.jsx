import pic from "@/Photos/messfee.jpg";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { UtensilsIcon as CutleryIcon, LeafIcon, BeefIcon as MeatIcon, InfoIcon } from 'lucide-react';

const MessFeeDetails = () => {
  const vegFees = {
    messFee: "₹2,000",
    taxFee: "₹200",
    maintenanceFee: "₹300",
  };

  const nonVegFees = {
    messFee: "₹2,500",
    taxFee: "₹250",
    maintenanceFee: "₹300",
  };

  const rebateInfo = "Rebate is calculated as ₹50 per day of leave.";

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
                  src= { pic }
                  alt="Mess Illustration"
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Delicious Meals</h3>
                  <p>Enjoy nutritious and tasty food</p>
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
              <FeeTable title="Veg Students" fees={vegFees} icon={<LeafIcon className="text-green-500" />} />
              <FeeTable title="Non-Veg Students" fees={nonVegFees} icon={<MeatIcon className="text-red-500" />} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FeeTable = ({ title, fees, icon }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-2xl font-semibold flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Fee Type</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(fees).map(([key, value], index) => (
            <TableRow key={index} className="transition-colors hover:bg-gray-100">
              <TableCell className="font-medium">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default MessFeeDetails;

