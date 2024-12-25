'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CalendarIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Button } from '@/Components/ui/button'; // Import Button component
import LeavesDashphoto from '@/Photos/LeavesDash-photo.jpg'; // Update the path to your image file

type Action = {
  label: string;
  action: string;
};

type LeaveOption = {
  name: string;
  description: string;
  icon: React.ElementType; // Icon component
  actions: Action[];
};

const leaveOptions: LeaveOption[] = [
  {
    name: 'Long Leave',
    description: 'Manage your long leave applications.',
    icon: CalendarIcon,
    actions: [
      { label: 'View Leave Applications', action: 'view' },
      { label: 'Create New Leave Application', action: 'create' },
    ],
  },
  {
    name: 'Late Leave',
    description: 'Manage your late leave requests.',
    icon: CalendarIcon,
    actions: [
      { label: 'View Leave Requests', action: 'view' },
      { label: 'Create New Leave Request', action: 'create' },
    ],
  },
];

export default function LeaveDashboardPage() {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleDropdown = (name: string) => {
    setExpandedOption(expandedOption === name ? null : name);
  };

  const handleViewLeaveApplications = () => {
    navigate('/LongLeavesView'); // Navigate to the new page when button is clicked
  };

  const createLeaveApplications = () => {
    navigate('/create-leave-request'); // Navigate to the new page when button is clicked
  };

  return (
    <div>

      {/* Leave Dashboard Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 p-8 bg-gray-100 mt-16">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-dark-teal">Leave Management</h2>
          <p className="mt-4 text-4xl font-semibold text-gray-900">Manage Your Leaves</p>
          <div className="mt-6 space-y-6">
            {leaveOptions.map((option) => (
              <div
                key={option.name}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(option.name)}
                >
                  <div className="flex items-center">
                    <option.icon className="h-6 w-6 text-dark-teal mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                      <p className="mt-1 text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-dark-teal">
                    {expandedOption === option.name ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6" />
                    )}
                  </div>
                </div>
                {expandedOption === option.name && (
                  <div className="mt-4 space-y-2">
                    {option.actions.map((action) => (
                      <Button
                        key={action.label}
                        className="w-full bg-light-teal hover:bg-middle-teal text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        onClick={action.label === 'View Leave Applications' ? handleViewLeaveApplications : action.label === 'Create New Leave Application' ? createLeaveApplications : () => alert(`${action.label} clicked`)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={LeavesDashphoto}
            alt="Leave Management"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
