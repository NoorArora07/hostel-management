import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import pic from "@/Photos/messfee.jpg";

const MessPaymentPlan = () => {
  const paymentPlans = [
    {
      plan: "Monthly",
      cost: "₹2,500",
      features: "3 meals per day, 7 days a week",
    },
    {
      plan: "Quarterly",
      cost: "₹7,000",
      features: "Discounted rate, priority seating",
    },
    {
      plan: "Half-Yearly",
      cost: "₹13,000",
      features: "Additional snacks, festive meals included",
    },
    {
      plan: "Yearly",
      cost: "₹25,000",
      features: "Premium benefits, free event access",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100">
      <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center mr-10">
        <img
          src= {pic}
          alt="Mess Illustration"
          className="rounded-lg shadow-lg object-cover h-64 w-64"
        />
      </div>

      {/* Table Section */}
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center md:text-left">
          Mess Payment Plans
        </h1>
        <Table className="w-full bg-white shadow-md rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-purple-600">
                Plan
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-purple-600">
                Cost
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-purple-600">
                Features
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentPlans.map((plan, index) => (
              <TableRow key={index}>
                <TableCell className="border px-4 py-2 font-medium text-gray-800">
                  {plan.plan}
                </TableCell>
                <TableCell className="border px-4 py-2 text-gray-700">
                  {plan.cost}
                </TableCell>
                <TableCell className="border px-4 py-2 text-gray-700">
                  {plan.features}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MessPaymentPlan;
