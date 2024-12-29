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
import { getFromBackend, postToBackend } from "@/store/fetchdata"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from 'lucide-react'

export default function ComplaintsViewW() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)

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

  const handleStatusChange = async (id, status) => {
    try {
      await postToBackend("http://127.0.0.1:5090/api/warden-complaint/update-status", {
        id,
        status,
      })
      
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === id ? { ...complaint, status } : complaint
        )
      )
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

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

  return (
    <Card className="w-full mt-40 mb-20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Complaints Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Student ID</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                    Loading complaints...
                  </TableCell>
                </TableRow>
              ) : complaints.length > 0 ? (
                complaints.map((complaint) => (
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
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(complaint.id, "Pending")}
                        >
                          Pending
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(complaint.id, "Resolved")}
                        >
                          Resolved
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(complaint.id, "Rejected")}
                        >
                          Rejected
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

