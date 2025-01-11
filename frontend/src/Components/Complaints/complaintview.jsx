'use client'

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getFromBackend } from "@/store/fetchdata"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { AuroraBackground } from "../ui/aurora-background.tsx";

export default function ComplaintsView() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const complaintsPerPage = 5

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        const response = await getFromBackend("http://127.0.0.1:5090/api/complaint/view")
        const complaintsArray = response.data.complaints || []
        console.log(response)
        setComplaints(Array.isArray(complaintsArray) ? complaintsArray : [])
      } catch (error) {
        console.error("Failed to fetch complaints", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const filteredComplaints = complaints.filter((complaint) =>
    Object.values(complaint).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const indexOfLastComplaint = currentPage * complaintsPerPage
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  )

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status.toLowerCase() === "pending"
  )

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status.toLowerCase() === "resolved"
  )

  const rejectedComplaints = complaints.filter(
    (complaint) => complaint.status.toLowerCase() === "rejected"
  )

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  function StatCard({ title, count, color }) {
    return (
      <Card className="bg-white/70 border-none shadow-md flex-1 flex items-center justify-center">
        <div className="text-center">
          <CardTitle className={`text-black text-xl font-bold mt-4`}>{title} Complaints</CardTitle>
          <CardContent>
            <p className={`text-violet-800 text-5xl font-semibold`}>{count}</p>
          </CardContent>
        </div>
      </Card>
    )
  }

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
    <div className="relative min-h-screen bg-gray-100">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />
      <div className="h-20"></div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12 mt-16">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">

          {/* Stats Cards */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <StatCard
              title="Pending"
              count={pendingComplaints.length}
            />
            <StatCard
              title="Resolved"
              count={resolvedComplaints.length}
            />
            <StatCard
              title="Rejected"
              count={rejectedComplaints.length}
            />
          </div>

          {/* Complaints Table */}
          <div className="lg:col-span-3 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-8 space-y-8 h-full">
            <Card className="w-full shadow-md bg-gray-50 border-none">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <CardTitle className="text-2xl font-bold">All Complaints</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search complaints..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">

                  <Table>
                    <TableHeader >
                      <TableRow className="bg-violet-500 group hover:bg-none">
                        <TableHead className="w-[100px] text-white">Date</TableHead>
                        <TableHead className="text-white">Title</TableHead>
                        <TableHead className="hidden md:table-cell text-white">Description</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            <div className="flex justify-center items-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : currentComplaints.length > 0 ? (
                        currentComplaints.map((complaint) => (
                          <TableRow key={complaint.id} className="hover:bg-none"> 
                            <TableCell className="font-medium">{formatDate(complaint.date)}</TableCell>
                            <TableCell>{complaint.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{complaint.description}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(complaint.status)} px-2 py-1 rounded-full text-xs font-semibold`}>
                                {complaint.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            No complaints found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">
                    Showing {indexOfFirstComplaint + 1} to {Math.min(indexOfLastComplaint, filteredComplaints.length)} of {filteredComplaints.length} complaints
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
