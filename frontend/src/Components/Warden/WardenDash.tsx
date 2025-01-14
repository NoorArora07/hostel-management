'use client'

import React, { useState, useEffect } from 'react';
import { checkWarden } from '../../store/fetchdata';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, MessageSquare, User, LogOut } from 'lucide-react';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import pic from '@/Photos/wardendash6.jpg';
import { CircleUserRoundIcon } from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-black">
        <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="mt-20 min-h-screen bg-gradient-to-r from-purple-900 to-black text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="sticky top-0 z-50 p-4 md:p-6 flex items-center justify-center shadow-lg">
        <div className="mt-3 flex items-center space-x-4">
          <CircleUserRoundIcon className="w-8 h-8" />
          <h1 className="text-center text-2xl md:text-3xl font-bold text-purple-200">Warden Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg text-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Leaves Management</CardTitle>
              <CardDescription className="text-violet-100">Manage student leaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Button
                className="w-full bg-violet-600 border border-white hover:bg-violet-800 text-white shadow-md transition-colors duration-200"
                onClick={() => handleNavigation('/LongLeavesApprove')}
              >
                <FileText className="mr-2 h-5 w-5" /> Long Leaves
              </Button>
              <Button
                className="w-full bg-violet-600 border border-white hover:bg-violet-800 text-white shadow-md transition-colors duration-200"
                onClick={() => handleNavigation('/LateLeavesApprove')}
              >
                <Clock className="mr-2 h-5 w-5" /> Late Leaves
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg text-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Mess Schedule</CardTitle>
              <CardDescription className="text-violet-100">View and manage mess schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Button
                className="w-full bg-violet-600 border border-white hover:bg-violet-800 text-white shadow-md transition-colors duration-200"
                onClick={() => handleNavigation('/mess-schedule-warden')}
              >
                <Calendar className="mr-2 h-5 w-5" /> View Schedule
              </Button>
              <Button
                className="w-full bg-violet-600 border border-white hover:bg-violet-800 text-white shadow-md transition-colors duration-200"
                onClick={() => handleNavigation('/add-mess-fee')}
              >
                <FileText className="mr-2 h-5 w-5" /> Add Mess Fee
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg text-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Complaints</CardTitle>
              <CardDescription className="text-violet-100">Address student complaints</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Button
                className="w-full bg-violet-600 border border-white hover:bg-violet-800 text-white shadow-md transition-colors duration-200"
                onClick={() => handleNavigation('/complaintsviewwarden')}
              >
                <MessageSquare className="mr-2 h-5 w-5" /> View Complaints
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default WardenDash;