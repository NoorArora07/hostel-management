'use client'

import React, { useState, useEffect } from 'react';
import { checkWarden } from '../../store/fetchdata';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, Menu, MessageSquare, User } from 'lucide-react';

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ScrollArea } from "@/Components/ui/scroll-area";

const WardenDash = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        setIsLoading(true);
        const message = await checkWarden();
        if (message === "access denied!") {
          navigate('/AccessDenied');
        }
      } catch (error) {
        console.error("Error while checking access:", error);
        navigate('/AccessDenied');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [navigate]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Warden Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Leaves Management</CardTitle>
                <CardDescription>Manage student leaves</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2" onClick={() => handleNavigation('/LongLeavesApprove')}>
                  <FileText className="mr-2 h-4 w-4" /> Long Leaves
                </Button>
                <Button className="w-full" onClick={() => handleNavigation('/late-leaves-approve')}>
                  <Clock className="mr-2 h-4 w-4" /> Late Leaves
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Mess Schedule</CardTitle>
                <CardDescription>View and manage mess schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => handleNavigation('/mess-schedule-warden')}>
                  <Calendar className="mr-2 h-4 w-4" /> View Schedule
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Complaints</CardTitle>
                <CardDescription>Address student complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => handleNavigation('/complaintsviewwarden')}>
                  <MessageSquare className="mr-2 h-4 w-4" /> View Complaints
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
        </motion.div>
      </main>
    </div>
  );
};

export default WardenDash;