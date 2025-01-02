import React from "react";
import { PencilSquareIcon, BanknotesIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import messPic from '@/Photos/mess-pic.jpg';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    name: 'Get Your Mess Details',
    description:
      'Including a calendar to keep track of your mess schedule and mess menu, plan your meals accordingly :)',
    icon: PencilSquareIcon,
    actions: [
      { text: 'View Updates', path: '/mess-schedule-view' },
      { text: 'View Menu', path: '/mess-menu' },
    ],
  },
  {
    name: 'Pay Your Mess Fee',
    description: "Can't keep a track of your mess fee? We got you covered. Pay your mess fee online",
    icon: BanknotesIcon,
    actions: [
      { text: 'View Fee Structure', path: '/view-mess-fee' },
      { text: 'Pay Now', path: '/mess-fee-payment' },
    ],
  },
  {
    name: 'Update Mess Leave Days',
    description: 'Going out for a vacation? Update your leave days and we will take care of the rest.',
    icon: ClipboardDocumentCheckIcon,
    actions: [
      { text: 'View Leaves', path: '/mess-leave-view' },
      { text: 'Update Leaves', path: '/mess-leave-form' },
    ],
  },
]

export default function Mess() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-white min-h-screen font-sans mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-indigo-600 font-semibold text-lg mb-2">Dormify Mess</h2>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Manage Your Mess</h1>
            <div className="space-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="flex space-x-4">
                  <feature.icon className="h-8 w-8 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                          Options
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {feature.actions.map((action, index) => (
                          <DropdownMenuItem key={index} onSelect={() => handleNavigation(action.path)}>
                            {action.text}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 lg:h-auto">
            <img
              src={messPic}
              alt="Mess"
              className="w-full h-full object-cover rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

