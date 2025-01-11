import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromBackend } from "../../store/fetchdata";
import { Button } from "@/Components/ui/button";
import { AuroraBackground } from "../ui/aurora-background.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { baseUrl } from "@/urls";

const LongLeavesView = () => {
  const navigate = useNavigate();
  const [sentApplications, setSentApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const sentResponse = await getFromBackend(
          `${baseUrl}/api/leaves/long-leaves/pending`
        );
        const approvedResponse = await getFromBackend(
          `${baseUrl}/api/leaves/long-leaves/accepted/`
        );

        setSentApplications(
          Array.isArray(sentResponse.data)
            ? sentResponse.data.map((application) => ({
                dateOfLeaving: application.dateOfLeaving,
                dateOfReturn: application.dateOfReturn,
              }))
            : []
        );
        setApprovedApplications(
          Array.isArray(approvedResponse.data)
            ? approvedResponse.data.map((application) => ({
                dateOfLeaving: application.dateOfLeaving,
                dateOfReturn: application.dateOfReturn,
              }))
            : []
        );
      } catch (error) {
        console.error("Error fetching applications:", error);
        setSentApplications([]);
        setApprovedApplications([]);
      }
    };

    fetchApplications();
  }, []);

  const handleCreateNewRequest = () => {
    navigate("/create-leave-request");
  };

  const StatCard = ({ title, count }) => (
    <Card className="bg-white/70 border-none shadow-md flex-1 flex items-center justify-center">
      <div className="text-center">
        <CardTitle className="text-black text-xl font-bold">{title}</CardTitle>
        <CardContent>
          <p className="text-violet-700 text-6xl font-bold">{count}</p>
        </CardContent>
      </div>
    </Card>
  );

  const ApplicationsTable = ({ title, applications, emptyMessage }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">{title}</h2>
      {applications.length > 0 ? (
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs uppercase text-white bg-violet-500">
            <tr>
              <th className="px-4 py-2">Leave Dates</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">
                  <strong>{application.dateOfLeaving}</strong> to{" "}
                  {application.dateOfReturn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">{emptyMessage}</p>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />

      <div className="h-20"></div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12 mt-16">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Stats Cards */}
          <div className="flex flex-col gap-6 h-full">
            <StatCard
              title="Sent Applications"
              count={sentApplications.length}
              color="violet"
            />
            <StatCard
              title="Approved Applications"
              count={approvedApplications.length}
              color="violet"
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8 space-y-8 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Sent Applications */}
              <ApplicationsTable
                title="Sent Applications"
                applications={sentApplications}
                emptyMessage="No sent applications."
              />

              {/* Approved Applications */}
              <ApplicationsTable
                title="Approved Applications"
                applications={approvedApplications}
                emptyMessage="No approved applications."
              />
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleCreateNewRequest}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
                Create a New Long Leave Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongLeavesView;
