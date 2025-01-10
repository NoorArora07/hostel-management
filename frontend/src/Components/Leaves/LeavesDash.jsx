'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Button } from '@/Components/ui/button'; 
import LeavesDashphoto from '@/Photos/LeavesDash-photo.jpg'; 
import { AuroraBackground } from '../ui/aurora-background.tsx';

const leaveOptions = [
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
  const [expandedOption, setExpandedOption] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (name) => {
    setExpandedOption(expandedOption === name ? null : name);
  };

  const handleNavigation = (action, leaveType) => {
    if (leaveType === 'Long Leave') {
      if (action === 'view') {
        navigate('/LongLeavesView');
      } else if (action === 'create') {
        navigate('/create-leave-request');
      }
    } else if (leaveType === 'Late Leave') {
      if (action === 'view') {
        navigate('/LateLeavesView');
      } else if (action === 'create') {
        navigate('/LateLeaveForm');
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background */}
      <AuroraBackground className="absolute top-0 left-0 right-0 z-0 h-full" />

      {/* Leave Dashboard Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 bg-white/20 backdrop-blur-lg mt-16 relative z-10">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-3xl font-bold text-violet-100">Leave Management</h2>
          <p className="text-4xl font-semibold text-white leading-tight">Manage Your Leaves with Ease</p>
          <p className="mt-4 text-lg text-violet-100">
            Keep track of your leave requests, view the status of applications, and create new leave requests.
          </p>

          <div className="space-y-6">
            {leaveOptions.map((option) => (
              <div
                key={option.name}
                className="bg-violet-100 p-6 rounded-2xl shadow-sm shadow-black border mt-6 border-gray-200 hover:shadow-xl "
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(option.name)}
                >
                  <div className="flex items-center space-x-4">
                    <option.icon className="h-8 w-8 text-violet-800" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-violet-800">
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
                        className="w-full bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
                        onClick={() => handleNavigation(action.action, option.name)}
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
        <div className="lg:w-1/2 p-6">
          <img
            src={LeavesDashphoto}
            alt="Leave Management"
            className="rounded-lg shadow-xl w-full h-30 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
