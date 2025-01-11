'use client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '@/store/fetchdata';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { AuroraBackground } from "../ui/aurora-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import axios from 'axios';

const MessLeaveForm = () => {
  const navigate = useNavigate();
  const [dateOfLeaving, setDateOfLeaving] = useState('');
  const [dateOfReturn, setDateOfReturn] = useState('');
  const [reason, setReason] = useState('');
  const [lastMeal, setLastMeal] = useState('');
  const [firstMeal, setFirstMeal] = useState('');
  const [error, setError] = useState('');

  const handleLastMealChange = (meal: string) => {
    setLastMeal(meal);
    console.log("Selected last meal:", meal);
  };

  const handleFirstMealChange = (meal: string) => {
    setFirstMeal(meal);
    console.log("Selected first meal:", meal);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateOfLeaving || !dateOfReturn || !reason || !lastMeal || !firstMeal) {
      setError('All fields are required.');
      return;
    }

    const messData = {
      dateOfLeaving,
      dateOfReturn,
      reason,
      lastMeal,
      firstMeal,
    };

    try {
      const result = await postToBackend('http://127.0.0.1:5090/api/mess/off', messData);
      console.log(`Application data`, messData, result);
      console.log('Mess leave request submitted successfully');
      navigate('/Homepage');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('There was an error submitting the leave request.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <AuroraBackground className="fixed inset-0 pointer-events-none z-0" />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10 ">
        <Card className="w-full max-w-xl bg-white shadow-lg rounded-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-black">
              Create Mess Leave Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div>
                <label htmlFor="dateOfLeaving" className="block text-sm font-medium text-gray-700">
                  Date of Leaving
                </label>
                <Input
                  type="date"
                  id="dateOfLeaving"
                  value={dateOfLeaving}
                  onChange={(e) => setDateOfLeaving(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="dateOfReturn" className="block text-sm font-medium text-gray-700">
                  Date of Return
                </label>
                <Input
                  type="date"
                  id="dateOfReturn"
                  value={dateOfReturn}
                  onChange={(e) => setDateOfReturn(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason for Mess Leave
                </label>
                <Input
                  type="text"
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastMeal" className="block text-sm font-medium text-gray-700">
                  Last Meal on Leaving Date
                </label>
                <Select value={lastMeal} onValueChange={handleLastMealChange} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Last Meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="firstMeal" className="block text-sm font-medium text-gray-700">
                  First Meal After Returning
                </label>
                <Select value={firstMeal} onValueChange={handleFirstMealChange} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select First Meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessLeaveForm;
