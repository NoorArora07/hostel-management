'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getFromBackend, postToBackend, patchToBackend } from "@/store/fetchdata"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from 'lucide-react'

export default function ComplaintsViewW() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await getFromBackend("http://127.0.0.1:5090/api/warden-complaint/all");
        const complaintsArray = response.data.complaints || [];
        setComplaints(Array.isArray(complaintsArray) ? complaintsArray : []);
      } catch (error) {
        console.error("Failed to fetch complaints", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = async (sid, complaintId, status) => {
    const info = {sid: sid, complaintId: complaintId, status: status.toLowerCase()}
    try {
      const response = await patchToBackend(
        "http://127.0.0.1:5090/api/warden-complaint/update-status", info
      );
  
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId ? { ...complaint, status } : complaint
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error.response ? error.response.data : error.message);
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingComplaints = complaints.filter(complaint => complaint.status.toLowerCase() === 'pending');
  const otherComplaints = complaints.filter(complaint =>
    ['resolved', 'rejected'].includes(complaint.status.toLowerCase())
  );

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }  

  return (
    <div className="mt-40 mb-20 px-4">
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Pending Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold w-24">Student ID</TableHead>
                  <TableHead className="font-semibold w-40">Date</TableHead>
                  <TableHead className="font-semibold w-48">Title</TableHead>
                  <TableHead className="font-semibold w-96">Description</TableHead>
                  <TableHead className="font-semibold w-24">Status</TableHead>
                  <TableHead className="font-semibold w-40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                      Loading complaints...
                    </TableCell>
                  </TableRow>
                ) : pendingComplaints.length > 0 ? (
                  pendingComplaints.map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell className="font-medium">{complaint.sid}</TableCell>
                      <TableCell className="whitespace-normal">{formatDate(complaint.date)}</TableCell>
                      <TableCell className="whitespace-normal">{complaint.title}</TableCell>
                      <TableCell className="whitespace-normal">{complaint.description}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(complaint.sid, complaint._id, "resolved")}
                          >
                            Resolve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(complaint.sid, complaint._id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No pending complaints found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Resolved / Rejected Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold w-24">Student ID</TableHead>
                  <TableHead className="font-semibold w-40">Date</TableHead>
                  <TableHead className="font-semibold w-48">Title</TableHead>
                  <TableHead className="font-semibold w-96">Description</TableHead>
                  <TableHead className="font-semibold w-24">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                      Loading complaints...
                    </TableCell>
                  </TableRow>
                ) : otherComplaints.length > 0 ? (
                  otherComplaints.map((complaint) => (
                    <TableRow key={complaint.complaintId}>
                      <TableCell className="font-medium">{complaint.sid}</TableCell>
                      <TableCell className="whitespace-normal">{formatDate(complaint.date)}</TableCell>
                      <TableCell className="whitespace-normal">{complaint.title}</TableCell>
                      <TableCell className="whitespace-normal">{complaint.description}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No resolved or rejected complaints found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}