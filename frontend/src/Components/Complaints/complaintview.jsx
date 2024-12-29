'use client'

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getFromBackend } from "@/store/fetchdata"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ComplaintsView() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const complaintsPerPage = 10

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        const response = await getFromBackend("http://127.0.0.1:5090/api/warden-complaint/all")
        setComplaints(response.data)
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

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-36">
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Complaints</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Loading complaints...
                  </TableCell>
                </TableRow>
              ) : currentComplaints.length > 0 ? (
                currentComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.name}</TableCell>
                    <TableCell>{complaint.sid}</TableCell>
                    <TableCell>{complaint.email}</TableCell>
                    <TableCell>{complaint.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{complaint.description}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

