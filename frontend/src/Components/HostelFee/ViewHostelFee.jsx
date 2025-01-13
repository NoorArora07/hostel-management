import pic from "@/Photos/messfee.jpg";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { HomeIcon } from "lucide-react";
import { AuroraBackground } from "../ui/aurora-background";
import { baseUrl } from "@/urls";
import { getFromBackend } from "@/store/fetchdata";

const HostelFeeDetails = () => {
  const feeDetails = [
    { year: "1st Year", amount: "₹81,500" },
    { year: "2nd Year", amount: "₹75,500" },
    { year: "3rd Year", amount: "₹75,100" },
    { year: "4th Year", amount: "₹69,100" },
  ];

  const [userFeeStatus, setUserFeeStatus] = useState(null);

  useEffect(() => {
    const fetchUserFeeStatus = async () => {
      try {
        const response = await getFromBackend(`${baseUrl}/api/hostelFee/status`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch user fee status");
        }
        console.log("Raw Axios response:", response);
        
        const data = response.data;
        console.log("Parsed data:", data);

        setUserFeeStatus(data);
      } catch (error) {
        console.error("Error fetching user fee status:", error);
      }
    };

    fetchUserFeeStatus();
  }, []);

  return (
    <div className="relative min-h-screen">
      <AuroraBackground className="fixed top-0 left-0 right-0 z-0 h-full" />

        <div className="mt-14 min-h-screen flex items-center justify-center p-6">
          <Card className="w-full max-w-4xl bg-white/20 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-black text-white p-6">
              <CardTitle className="text-3xl font-bold flex items-center justify-center">
                <HomeIcon className="justify-center mr-3" size={20} />
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
                      <p>but home has no price. We wish to bring you the closest experience to your homes!</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <FeeTable feeDetails={feeDetails} />
                </div>
              </div>
              <div className="mt-8">
                <UserFeeStatus status={userFeeStatus} />
              </div>
            </CardContent>
          </Card>
        </div>
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
            <TableRow
              key={index}
              className="transition-colors hover:bg-gray-100"
            >
              <TableCell>{fee.year}</TableCell>
              <TableCell>{fee.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const UserFeeStatus = ({ status }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-2xl font-semibold">Your Fee Status:</CardTitle>
    </CardHeader>
    <CardContent>
      {status ? (
        <div className="text-lg">
          <p><strong>Name:</strong> {status.name}</p>
          <p><strong>Student ID:</strong> {status.studentId}</p>
          <p><strong>Amount:</strong> {status.amount}</p>
          <p className={status.status === "Paid" ? "text-green-600" : "text-red-600"}>
            <strong>Status:</strong> {status.status}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading your fee status...</p>
      )}
    </CardContent>
  </Card>
);

export default HostelFeeDetails;
