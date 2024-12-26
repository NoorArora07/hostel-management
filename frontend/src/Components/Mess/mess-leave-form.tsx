'use client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postToBackend } from '../../store/fetchdata';
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

const MessLeaveForm = () => {
  const navigate = useNavigate();
  const [dateOfLeaving, setDateOfLeaving] = useState('');
  const [dateOfReturn, setDateOfReturn] = useState('');
  const [reason, setReason] = useState('');
  const [lastMeal, setLastMeal] = useState('');
  const [firstMeal, setFirstMeal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateOfLeaving || !dateOfReturn || !reason || !lastMeal || !firstMeal) {
      setError('All fields are required.');
      return;
    }

    const applicationData = [
      {
        dateOfLeaving,
        dateOfReturn,
        reason,
        lastMeal,
        firstMeal,
      },
    ];

    try {
      const result = await postToBackend('http://127.0.0.1:5090/api/mess/off', applicationData);
      console.log(`application data`, applicationData, result);
      navigate('/Homepage');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('There was an error submitting the leave request.');
    }
 };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Mess Leave Application System</h1>
      
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-600">Create Mess Leave Request</CardTitle>
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
                Reason for mess leave
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
                Last meal eaten on the date of leaving
              </label>
              <Select value={lastMeal} onValueChange={setLastMeal} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select last meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="firstMeal" className="block text-sm font-medium text-gray-700">
                First meal after returning from leave
              </label>
              <Select value={firstMeal} onValueChange={setFirstMeal} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select first meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessLeaveForm;